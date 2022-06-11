import { TicketUpdatedListener } from "../ticket-updated.listener"
import { natsWrapper } from "../../../nats-wrapper"
import { Ticket } from "../../../models/ticket"
import mongoose from "mongoose"
import { TicketUpdatedEvent } from "@fan-tickets/common"
import { Message } from 'node-nats-streaming'

const setup = async () => {
  // Create a listener
  const listener = new TicketUpdatedListener(natsWrapper.client)

  // Create and save a ticekt 
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20

  })
  await ticket.save()
  // Create a fake data object
  const data: TicketUpdatedEvent['data'] = {
    id: ticket.id,
    version: ticket.version + 1,
    title: '123',
    price: 123,
    userId: new mongoose.Types.ObjectId().toHexString(),
  }
  // Create a fake msg obejct
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  }
  // return all
  return { msg, data, listener, ticket }
}

it('finds, udpates, and saves a ticket', async () => {
  const { msg, data, ticket, listener } = await setup()

  await listener.onMessage(data, msg)

  const updatedTicket = await Ticket.findById(ticket.id)

  expect(updatedTicket!.title).toEqual(data.title)
  expect(updatedTicket!.price).toEqual(data.price)

})

it('acks the message', async () => {
  const { msg, data, listener } = await setup()

  await listener.onMessage(data, msg)

  expect(msg.ack).toHaveBeenCalled()
})

it('does not call ack if the event has a skipped version number', async () => {
  const { msg, data, listener } = await setup()

  data.version = 10
  try {
    await listener.onMessage(data, msg)

  } catch (error) {

  }

  expect(msg.ack).not.toHaveBeenCalled()
})
