import { Subjects, OrderCreatedEvent, Listener } from "@fan-tickets/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from './queue-group-name'
import { expirationQueue } from "../../queues/expirtaion-queue";

export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
  subject: Subjects.OrderCreated = Subjects.OrderCreated
  queueGroupName = queueGroupName

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime()
    console.log('waiting time ', delay)

    await expirationQueue.add({
      orderId: data.id
    }, {
      delay: delay
    })


    msg.ack()
  }
}