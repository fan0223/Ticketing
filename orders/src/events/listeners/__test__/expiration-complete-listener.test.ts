import { natsWrapper } from "../../../nats-wrapper";
import { ExpirationCompleteListener } from "../expiration-complete-listener";
import { Order } from "../../../models/order";
import { Ticket } from "../../../models/ticket";
import mongoose from "mongoose";
import { ExpirationCompleteEvent, OrderStatus } from "@fan-tickets/common";
import { Message } from 'node-nats-streaming'

const setup = async () => {
  const listener = new ExpirationCompleteListener(natsWrapper.client)

  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20
  })
  await ticket.save()

  const order = Order.build({
    userId: 'ffdsfsd',
    status: OrderStatus.Created,
    expiresAt: new Date(),
    ticket
  })
  await order.save()

  const data: ExpirationCompleteEvent['data'] = {
    orderId: order.id
  }

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  }

  return { order, ticket, msg, listener, data }
}

it('updates the order statis to cancelled', async () => {
  const { order, ticket, msg, listener, data } = await setup()
  await listener.onMessage(data, msg)

  const updatedOrder = await Order.findById(order.id)
  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled)

})
it('emit an OrderCancelled event', async () => {
  const { order, ticket, msg, listener, data } = await setup()
  await listener.onMessage(data, msg);
  expect(natsWrapper.client.publish).toHaveBeenCalled()
  expect(JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1]).id).toEqual(order.id)
})
it('ack the message', async () => {
  const { order, ticket, msg, listener, data } = await setup()
  await listener.onMessage(data, msg)
  expect(msg.ack).toHaveBeenCalled()
})