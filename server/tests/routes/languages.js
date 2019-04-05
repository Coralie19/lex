/* eslint-env mocha */
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const { expect } = chai;

module.exports = (app) => {
  const username = 'onalanhu';
  const password = 'uhnalano';
  let token;

  it('should successfully log a user in and return a token', () => chai.request(app)
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
    }));

  it('GET /languages should route correctly', () => chai.request(app)
    .get('/languages')
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      expect(res).to.have.status(200);
    })
    .catch((err) => {
      throw err;
    }));
};
