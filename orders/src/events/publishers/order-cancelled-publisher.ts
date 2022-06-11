import { Publisher, Subjects, OrderCancelledEvent } from "@fan-tickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled
}