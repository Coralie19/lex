/* eslint no-console: 0 */
const http = require('http');
const socketio = require('socket.io');
const usersDb = require('./onlineUsersDb');
const { pair, filterProps } = require('./utils');
const { message: Message, user: User } = require('./db/models');

const ioConfig = (app) => {
  const server = http.createServer(app);
  const io = socketio(server);

  io.on('connect', (user) => {
    console.log('connected', user.handshake.query.id);
    usersDb.logIn(user.handshake.query.id, user);

    io.emit('update-online-users', usersDb.getAll());
    console.log(usersDb.getAll());
    user.broadcast.emit('user-log-in', user.handshake.query.id);

    user.on('disconnect', () => {
      usersDb.logOut(user.handshake.query.id);
      user.broadcast.emit('user-log-out', user.handshake.query.id);
      user.broadcast.emit('update-online-users', usersDb.getAll());
    });

    user.on('debug', (err) => {
      console.log(err);
    });

    user.on('request-room', async (ids, ack) => {
      try {
        ids.sort((a, b) => a - b);
        const roomId = pair(ids);
        console.log(ids);
        ids.forEach((id) => {
          if (usersDb.getSocket(id)) usersDb.getSocket(id).join(roomId);
        });
        const messages = await Message.findAll({
          where: { roomId },
          include: [{
            model: User,
            attributes: ['username'],
          }],
          attributes: [
            'authorId',
            'timestamp',
            'id',
            'content',
          ],
        });

        ack(roomId, messages);
      } catch (err) {
        console.log(err);
        user.emit('error');
      }
    });

    user.on('message', async (message, roomId, ack) => {
      try {
        const filteredMessage = filterProps(message, [
          'content', 'authorId', 'timestamp',
        ]);
        filteredMessage.roomId = roomId;
        await Message.create(filteredMessage);
        const author = await User.findOne({
          where: { id: filteredMessage.authorId },
          attributes: ['username'],
        });
        filteredMessage.user = author.dataValues;
        user.to(roomId).emit('new-message', filteredMessage);
        ack(message);
      } catch (err) {
        console.log(err);
        user.emit('error');
      }
    });

    user.on('video-offer', (sdp, roomId) => {
      user.to(roomId).emit('video-offer', sdp);
    });

    user.on('video-answer', (sdp, roomId) => {
      user.to(roomId).emit('video-answer', sdp);
    });

    user.on('new-ice-candidate', (sdp, roomId) => {
      user.to(roomId).emit('new-ice-candidate', sdp);
    });
  });

  return server;
};

module.exports = ioConfig;
