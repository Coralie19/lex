require('dotenv').config();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2;
const path = require('path');
const jwt = require('jsonwebtoken');
const {
  Sequelize: { Op },
  user: User,
  language: Language,
  userLanguage: UserLanguage,
  proficiency: Proficiency,
} = require('../db/models');
const { filterProps } = require('../utils');

const jwtSecret = process.env.JWT_SECRET;

async function createFilteredUser(user) {
  try {
    const languages = await UserLanguage.findAll({
      where: { userId: user.dataValues.id },
      include: [
        { model: Language },
        { model: Proficiency },
      ],
    });

    const filteredUser = filterProps(user.dataValues, [
      'username', 'aboutMe', 'photoUrl', 'id', 'languages',
    ]);

    filteredUser.languages = languages.map((language) => {
      const proficiency = language.proficiency === null ? {} : {
        name: language.proficiency.name,
        id: language.proficiency.id,
        level: language.proficiency.level,
      };

      return {
        id: language.languageId,
        learning: language.learning,
        proficiency,
        name: language.language.dataValues.name,
        isoCode: language.language.dataValues.isoCode,
      };
    });
    return filteredUser;
  } catch (err) {
    return err;
  }
}

exports.getAll = async (req, res) => {
  res.set('Content-Type', 'application/json');
  console.log(req.user)
  await User.findOne({
    where: {
      id: req.user.id,
    },
    include: [{ model: Language }],
  });
  // const test = await User.findOne({
  //   where: {
  //     username: "igorn"
  //   }
  // })

  // console.log(test);

  const users = await User.findAll();
  res.send(users);
};

exports.getMatches = async (req, res) => {
  try {
    const userLanguages = await UserLanguage.findAll({
      where: {
        userId: req.user.id,
      },
      include: [Proficiency],
    });

    const fluentLanguages = userLanguages.filter(language => (
      language
      && language.dataValues.proficiency
      && (language.dataValues.proficiency.dataValues.level === 3)
    ));

    const learningLanguages = userLanguages.filter(language => (
      language
      && language.dataValues.learning
    ));

    const fluentInLearningLanguages = await UserLanguage.findAll({
      include: [
        { model: Proficiency },
        {
          model: User,
          include: [{
            model: Language,
            as: 'languages',
          }],
        },
      ],
      where: {
        [Op.not]: { userId: req.user.id },
        '$proficiency.level$': 3,
        [Op.or]: { languageId: learningLanguages.map(language => language.dataValues.languageId) },
      },
    });

    const learningFluentLanguages = await UserLanguage.findAll({
      include: [
        { model: Proficiency },
        {
          model: User,
          include: [{
            model: Language,
            as: 'languages',
          }],
        },
      ],
      where: {
        [Op.or]: { languageId: fluentLanguages.map(language => language.dataValues.languageId) },
        [Op.and]: { learning: true },
        [Op.not]: { userId: req.user.id },
      },
    });

    const fluentUsers = fluentInLearningLanguages.map(userLanguage => userLanguage.dataValues.user);
    const learningUsers = learningFluentLanguages.map(userLanguage => userLanguage.dataValues.user);

    const matchedUsers = _.uniqBy(_.intersectionBy(fluentUsers, learningUsers, 'id'), 'id');

    const filteredUsers = await Promise.all(
      matchedUsers.map(async user => createFilteredUser(user)),
    );

    res.set('Content-Type', 'application/json');
    res.send(filteredUsers);
  } catch (err) {
    res
      .status(400)
      .set('Content-Type', 'text/plain')
      .send('Not found');
  }
};

exports.editUser = async (req, res) => {
  try {
    // Find the user in question
    const user = await User.findOne({
      where: { id: req.user.id },
      include: [{
        model: Language,
        as: 'languages',
      }],
      returning: true,
    });

    // Update user basic data
    const userUpdate = filterProps(req.body, [
      'username', 'aboutMe',
    ]);
    await user.update(userUpdate);


    // Update user languages
    // Create update object for updating UserLanguage join table
    const userLanguages = req.body.languages.map(language => ({
      languageId: language.id,
      userId: req.user.id,
      learning: language.learning,
      proficiencyId: language.proficiency.id,
    }));
    // Delete any languages no longer in the list
    if (userLanguages.length > 0) {
      await UserLanguage.destroy({
        where: {
          userId: req.user.id,
          [Op.not]: {
            [Op.or]: { languageId: userLanguages.map(language => language.languageId) },
          },
        },
      });
    } else {
      await UserLanguage.destroy({
        where: {
          userId: req.user.id,
        },
      });
    }

    // Add any new languages
    await Promise.all(userLanguages.map(userLanguage => UserLanguage.upsert(userLanguage)));

    const filteredUser = await createFilteredUser(user);
    res
      .status(200)
      .set('Content-Type', 'application/json')
      .send(filteredUser);
  } catch (err) {
    res
      .status(400)
      .set('Content-Type', 'text/plain')
      .send('Not found');
  }
};

exports.uploadPhoto = async (req, res) => {
  try {
    const image = await cloudinary.uploader.upload(path.resolve(req.file.path), { format: 'jpg' });
    const user = await User.findOne({
      where: { id: req.user.id },
    });
    await user.update({ photoUrl: image.secure_url });
    res
      .status(200)
      .set('Content-Type', 'application/json')
      .send({ photoUrl: image.secure_url });
  } catch (err) {
    res
      .status(500)
      .set('Content-Type', 'text/plain')
      .send('Error uploading photo');
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
      include: [{
        model: Language,
        as: 'languages',
      }],
    });

    const filteredUser = await createFilteredUser(user);

    res
      .set('Content-Type', 'application/json')
      .status(200)
      .send({ user: filteredUser });
  } catch (err) {
    res
      .status(400)
      .set('Content-Type', 'text/plain')
      .send('Not found');
  }
};

exports.create = async (req, res) => {
  try {
    const newUser = await User.create(req.body, {
      include: [{
        model: Language,
        as: 'languages',
      }],
    });

    const filteredUser = await createFilteredUser(newUser);
    const token = jwt.sign({ id: filteredUser.id }, jwtSecret, {
      expiresIn: '1h',
    });

    res
      .set('Content-Type', 'application/json')
      .status(201)
      .send({ token, user: filteredUser });
  } catch (err) {
    if (err.original) {
      res
        .status(409)
        .set('Content-Type', 'application/json')
        .send(JSON.stringify(err.errors[0].message));
    } else {
      console.log('err', err)
      res
        .status(500)
        .set('Content-Type', 'application/json')
        .send(JSON.stringify(err));
    }
  }
};

exports.logIn = async (req, res) => {
  try {
    const encoded = req.headers.authorization.slice('Basic '.length);
    const split = Buffer.from(encoded, 'base64').toString().split(':');
    if (split.length > 2) throw new Error();
    const [username, password] = split;

    const user = await User.findOne({
      where: { username },
      include: [{
        model: Language,
        as: 'languages',
      }],
    });

    if (!user) throw new Error();

    const authRes = await bcrypt.compare(password, user.dataValues.password);

    if (!authRes) throw new Error();

    const filteredUser = await createFilteredUser(user);

    const token = jwt.sign({ id: filteredUser.id }, jwtSecret, {
      expiresIn: '1h',
    });

    res
      .status(200)
      .set('Content-Type', 'application/json')
      .send({ token, user: filteredUser });
  } catch (err) {
    res
      .status(401)
      .set('Content-Type', 'text/plain')
      .send('Not authorized');
  }
};
