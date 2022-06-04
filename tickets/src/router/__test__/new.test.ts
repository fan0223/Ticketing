import request from 'supertest'
import { app } from '../../app'
import { Ticket } from '../../models/ticket'
it('has a route handler listening to /api/tickets for post request', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .send({})
  expect(response.status).not.toEqual(404)
})

it('can only be accessed if the user is signed in', async () => {
  await request(app)
    .post('/api/tickets')
    .send({})
    .expect(401)

})
it('retrurns a status other than 401 if the user is signed in', async () => {
  jest.setTimeout(30000);
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({})
  expect(response.status).not.toEqual(401)
})

it('return an error if an invalid title is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: '',
      price: 10
    })
    .expect(400)
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      price: 10
    })
    .expect(400)
})

it('return an error if an invalid price is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'asdsa',
      price: -10
    })
    .expect(400)
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'asdas'
    })
    .expect(400)
})

it('creates a ticket with valid inputs', async () => {
  jest.setTimeout(30000);
  let tickets = await Ticket.find({})
  expect(tickets.length).toEqual(0)

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'apmas',
      price: 20
    })
    .expect(201)

  tickets = await Ticket.find({})
  expect(tickets.length).toEqual(1)
})

