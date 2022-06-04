import { Publisher } from "./base-publisher";
import { Subjects } from "./subjects";
import { TicektCreatedEvent } from "./ticket-created-event";

export class TicketCreatedPublisher extends Publisher<TicektCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated


}