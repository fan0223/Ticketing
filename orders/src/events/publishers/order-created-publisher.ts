import { Publisher, Subjects, OrderCreatedEvent, OrderCancelledEvent } from "@fan-tickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
  subject: Subjects.OrderCreated = Subjects.OrderCreated
}