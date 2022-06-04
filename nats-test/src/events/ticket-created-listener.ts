import { Message } from 'node-nats-streaming'
import { Listener } from './base-listener'
import { TicektCreatedEvent } from './ticket-created-event'
import { Subjects } from './subjects'

export class TicketCreatedListener extends Listener<TicektCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated
  queueGroupName = 'payments-service'
  onMessage(data: TicektCreatedEvent["data"], msg: Message) {
    console.log('Event data!', data)

    msg.ack()
  }
}