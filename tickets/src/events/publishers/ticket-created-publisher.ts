import { Publisher, Subjects, TicketCreatedEvent } from "@fan-tickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
  subject: Subjects.TicketCreated = Subjects.TicketCreated
}