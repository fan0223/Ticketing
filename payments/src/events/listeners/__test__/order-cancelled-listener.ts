import { OrderCancelledListener } from "../order-cancelled-listener"
import { natsWrapper } from "../../../nats-wrapper"
import mongoose from "mongoose"
import { Message } from "node-nats-streaming"
import { Order } from "../../../models/order"
import { OrderCancelledEvent, OrderStatus } from "@fan-tickets/common"

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client)

  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    userId: new mongoose.Types.ObjectId().toHexString(),
    price: 10,
    status: OrderStatus.Created
  })
  await order.save()
  const data: OrderCancelledEvent['data'] = {
    id: order.id,
    version: 1,
    ticket: {
      id: new mongoose.Types.ObjectId().toHexString()
    }
  }
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  }
  return { listener, data, msg, order }
}

it('updated the status of order', async () => {
  const { listener, data, msg, order } = await setup()
  await listener.onMessage(data, msg)

  const updatedOrder = await Order.findById(data.id)
  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled)

})
it('acks the message', async () => {
  const { listener, data, msg, order } = await setup()
  await listener.onMessage(data, msg)

  expect(msg.ack).toHaveBeenCalled()
})