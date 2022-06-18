import { Subjects, Listener, OrderCancelledEvent } from "@fan-tickets/common";
import { Message } from 'node-nats-streaming'
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";
import { queueGroupName } from "./queue-group-name";

export class OrderCancelledListener extends Listener<OrderCancelledEvent>{
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled
  queueGroupName = queueGroupName

  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    const ticket = await Ticket.findById(data.ticket.id)
    if (!ticket) {
      throw new Error('Ticket not found')
    }

    ticket.set({ orderId: undefined })

    await ticket.save()


    // The publish is for make sure ticket version consistency, not update ticket content.
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      version: ticket.version,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      orderId: ticket.orderId
    })

    msg.ack()
  }
}