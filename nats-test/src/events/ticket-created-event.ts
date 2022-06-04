import { Subjects } from "./subjects";

export interface TicektCreatedEvent {
  subject: Subjects.TicketCreated
  data: {
    id: string,
    title: string,
    price: number
  }
}