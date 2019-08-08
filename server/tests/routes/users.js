/* eslint-env mocha */
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const { expect } = chai;

module.exports = (app) => {
  const username = 'buzz';
  const password = 'buzz';

  //Unit Testing

  describe('Valid endpoint access', () => {
    it('Should redirect from home to login && return correct status code',
      () => chai.request(app)
        .get('/')
        .then((res) => {
          expect(res).to.have.status(200);
          expect('Location', '/login');
        })
        .catch((err) => {
          throw err;
        }))
  });

  //Integration Testing

  describe('User lifecycle', () => {
    let token;
    it('should correctly create a new user', () => chai.request(app)
      .post('/register')
      .send({ username, password })
      .then((res) => {
        expect(res).to.have.status(201);
        expect(res.body.user.username).to.eql(username);
        expect(Object.prototype.hasOwnProperty.call(res.body, 'password')).to.be.false; // eslint-disable-line no-unused-expressions
      })
      .catch((err) => {
        throw err;
      }));
    it('should throw a 409 if there is a duplicate username', () => chai.request(app)
      .post('/register')
      .send({ username, password: 'test' })
      .then((res) => {
        expect(res).to.have.status(409);
      })
      .catch((err) => {
        throw err;
      }));

    it(`should redirect to edit profile page when user is successfully logged
        in and return status code 201`,
      () => chai.request(app)
        .get('/login')
        .set('Authorization', `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`)
        .then((res) => {
          console.log(res);
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token');
          expect(res.body.token).to.be.a('string');
          token = res.body.token;
          expect('Location', '/dashboard/edit');
        })
        .catch((err) => {
          throw err;
        }));

    it('should redirect to the edit profile page upon creating a new user', () => chai.request(app)
      .post('/register')
      .send({ username: 'Binge', password: 'Drinking' })
      .then((res) => {
        expect(res).to.have.status(201);
        expect(res.body.user.username).to.eql('Binge');
        expect('Location', '/dashboard/edit');
      })
      .catch((err) => {
        throw err;
      }));

    it('should let users with a token into protected routes', () => chai.request(app)
      .get('/user/matches')
      .set('Authorization', `Bearer ${token}`)
      .then((res) => {
        expect(res).to.have.status(200);
      })
      .catch((err) => {
        throw err;
      }));

    it('login should return a user and all his/her languages', () => chai.request(app)
      .get('/login')
      .set('Authorization', `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        expect(res.body.token).to.be.a('string');
        token = res.body.token;
      })
      .catch((err) => {
        throw err;
      }))

    it('Should block requests without authorization', () => chai.request(app)
      .get('/users/id/5')
      .then((res) => {
        expect(res).to.have.status(401);
      })
      .catch((err) => {
        throw err;
      }));

    it('GET /users/id/:id should route correctly', () => chai.request(app)
      .get('/users/username/5')
      .then((res) => {
        expect(res).to.have.status(401);
      })
      .catch((err) => {
        throw err;
      }));


    it('should not have stored token on home page (after user logout)', () => chai.request(app)
      .get('/')
      .then((res) => {
        console.log(res);
        expect(res).to.have.status(200);
        expect(res.body.token).to.eql(undefined);
      })
      .catch((err) => {
        throw err;
      })
    );
  });
}
