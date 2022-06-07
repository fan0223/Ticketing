import { Publisher, Subjects, TicektUpdatedEvent } from "@fan-tickets/common";

export class TicketUpdatedPublisher extends Publisher<TicektUpdatedEvent>{
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated
}