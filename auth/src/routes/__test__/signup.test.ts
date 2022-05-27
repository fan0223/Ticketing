import request from 'supertest'
import { app } from '../../app'

it('return a 201 on a successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: "test@test.com",
      password: 'password'
    })
    .expect(201)
})

it('return a 400 with an invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: "testfdgdf",
      password: 'password'
    })
    .expect(400)
})
it('return a 400 with an invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: "testfdgdf",
      password: 'p'
    })
    .expect(400)
})
it('return a 400 with missing email and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'das@dmas.com' })
    .expect(400)
  return request(app)
    .post('/api/users/signup')
    .send({ password: 'sadas' })
    .expect(400)
})
it('disallows duplicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201)
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(400)
})

it('sete a cookie after successful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201)

  expect(response.get('Set-Cookie')).toBeDefined()
})