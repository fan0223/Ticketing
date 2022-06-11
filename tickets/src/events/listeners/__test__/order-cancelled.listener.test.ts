import { OrderCancelledEvent, OrderStatus } from "@fan-tickets/common"
import { OrderCancelledListener } from "../order-cancelled-listener"
import { natsWrapper } from "../../../nats-wrapper"
import { Message } from 'node-nats-streaming'
import { Ticket } from "../../../models/ticket"
import mongoose from "mongoose"


const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client)

  const orderId = new mongoose.Types.ObjectId().toHexString()

  const ticket = Ticket.build({
    title: 'das',
    price: 22,
    userId: 'asdasd'
  })
  ticket.set({ orderId })
  await ticket.save()

  const data: OrderCancelledEvent['data'] = {
    id: orderId,
    version: 0,
    ticket: {
      id: ticket.id
    }
  }
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  }
  return { listener, data, msg, ticket, orderId }
}

it('updates the ticket, published an evnet, and acks the message', async () => {
  const { listener, data, msg, ticket, orderId } = await setup()
  await listener.onMessage(data, msg)
  const updatedTicket = await Ticket.findById(ticket.id)
  expect(updatedTicket!.orderId).not.toBeDefined()
  expect(msg.ack).toHaveBeenCalled()
  expect(natsWrapper.client.publish).toHaveBeenCalled()
})
it('', async () => {

})
it('', async () => {

})