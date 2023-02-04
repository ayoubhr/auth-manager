import { server } from '../dist/index.js'
import chai from 'chai'
import chaiHttp from 'chai-http'
import inMemoryMongo from '../dist/src/api/infrastructure/config/in_memory_db.js'

chai.should()
chai.use(chaiHttp)

describe("Auth-Manager test cases:\r\n", () => {

  after(async () => {
    await inMemoryMongo.stop()
  })

  it('it should try to register a new user but input data is not complete (lacking one or more fields).', (done) => {
    chai.request(server)
      .post('/api/auth/register')
      .send({
        name: "John",
        surname: "Doe",
        email: 'user@example.com'
      })
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.be.a('object')
        res.body.should.have.property('message').eql('All input fields are required and must be correct.')
        res.body.should.have.property('statuscode').eql('400. Bad Request.')
        res.body.should.have.property('errors').eql([{
          location: "body",
          msg: "Password input is empty.",
          param: "password",
        },
        {
          location: "body",
          msg: "You have to provide a correct password.",
          param: "password"
        }])
        done()
      })
  })

  it('it should register a new user.', (done) => {
    chai.request(server)
      .post('/api/auth/register')
      .send({
        name: "John",
        surname: "Doe",
        email: 'user@example.com',
        password: 'password'
      })
      .end((err, res) => {
        res.should.have.status(201)
        res.body.should.be.a('object')
        res.body.should.have.property('password')
        res.body.should.have.property('email').eql('user@example.com')
      })
      done()
  })

  it('it should try to authenticate a non registered user.', (done) => {
    chai.request(server)
      .post('/api/auth/login')
      .send({
        email: 'user_not_registered@example.com',
        password: 'Wrong password'
      })
      .end((err, res) => {
        res.should.have.status(404)
        res.body.should.be.a('object')
        res.body.should.have.property('error').eql('This user is not registered.')
        res.body.should.have.property('statuscode').eql('404. Not Found.')
      })
      done()
  });

  it('it should try to authenticate a user with invalid input.', (done) => {
    chai.request(server)
      .post('/api/auth/login')
      .send({
        email: 'user@example.com',
        password: 'Wrong password'
      })
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.be.a('object')
        res.body.should.have.property('error').eql('Invalid Credentials.')
        res.body.should.have.property('statuscode').eql('400. Bad Request.')
      })
      done()
  });

  it('it should try to authenticate a user but input data is not complete (lacking one or more fields).', (done) => {
    chai.request(server)
      .post('/api/auth/login')
      .send({
        email: "user@example.com"
      })
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.be.a('object')
        res.body.should.have.property('message').eql('All input fields are required and must be correct.')
        res.body.should.have.property('statuscode').eql('400. Bad Request.')
        res.body.should.have.property('errors').eql([{
          location: "body",
          msg: "Password input is empty.",
          param: "password",
        },
        {
          location: "body",
          msg: "You have to provide a correct password.",
          param: "password"
        }])
      })
      done()
  })

  it('it should authenticate a user with valid input.', (done) => {
    chai.request(server)
      .post('/api/auth/login')
      .send({
        email: 'user@example.com',
        password: 'password'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('token');
      })
      done()
  });

  it('it should try to register an existing user.', (done) => {
    chai.request(server)
      .post('/api/auth/register')
      .send({
        name: "John",
        surname: "Doe",
        email: 'user@example.com',
        password: 'password'
      })
      .end((err, res) => {
        res.should.have.status(409)
        res.body.should.be.a('object')
        res.body.should.have.property('error').eql('User already exists.')
        res.body.should.have.property('statuscode').eql('409. Conflict.')
      })
      done()
  })
})