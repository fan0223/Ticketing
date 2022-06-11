import { Publisher, Subjects, TicketUpdatedEvent } from "@fan-tickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated
}
