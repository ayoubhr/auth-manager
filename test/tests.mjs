//const server = require('./../index.ts')
//const request = require('chai')
//const use = require('chai')
//const chaiHttp = require('chai-http')
import server from './../dist/index.js'
import chai from 'chai'
import chaiHttp from 'chai-http'

let should = chai.should()
chai.use(chaiHttp)

let user = {
  name: "",
  surname: "",
  email: "",
  password: ""
}
let login = {
  email: "",
  password: ""
}

describe('Testing Auth functionalities', () => {

  beforeEach((done) => {
    user = {
      name: "",
      surname: "",
      email: "",
      password: ""
    }
    login = {
      email: "",
      password: ""
    }
    done()
  })

  it('it should register a new user', (done) => {
    user.name = "testName"
    user.surname = "testSurname"
    user.email = "test@gmail.com"
    user.password = "12345678"

    chai.request(server)
      .post('/api/auth/register')
      .send(user)
      .end((res, err) => {
        should(res.body).have.status(201)
        should(res.body).be.a('object')
        should(res.body).have.property('password')
        done()
      })
  })

  it('it should throw a bad request (/register)', (done) => {
    let badUser = {
      name: "testName",
      surname: "testSurname",
      email: "test@gmail.com"
    }

    chai.request(server)
      .post('/api/auth/register')
      .send(badUser)
      .end((res, err) => {
        res.should.have.status(400)
        res.body.should.be.a('object')
        res.body.should.have.property('error')
        done()
      })
  })

  it('it should login the user', (done) => {
    login.email = "test@gmail.com"
    login.password = "12345678"

    chai.request(server)
      .post('/api/auth/login')
      .send(login)
      .end((res, err) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('token')
        done()
      })
  })

  it('it should throw a bad request (/login)', (done) => {
    let badLogin = {
      password: "1234"
    }

    chai.request(server)
      .post('/api/auth/register')
      .send(badLogin)
      .end((res, err) => {
        res.should.have.status(400)
        res.body.should.be.a('object')
        res.body.should.have.property('error')
        done()
      })
  })
})