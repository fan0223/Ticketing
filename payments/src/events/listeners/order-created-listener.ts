import { Subjects, Listener, OrderCreatedEvent } from "@fan-tickets/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";
import { queueGroupName } from "./queue-group-name";


export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
  subject: Subjects.OrderCreated = Subjects.OrderCreated
  queueGroupName = queueGroupName

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const { id, status, userId, ticket, version } = data

    const order = Order.build({
      id: id,
      status: status,
      userId: userId,
      version: version,
      price: ticket.price
    })
    await order.save()


    msg.ack()
  }
}