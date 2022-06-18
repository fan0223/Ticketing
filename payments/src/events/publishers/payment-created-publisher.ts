import { Subjects, Publisher, PaymentCreatedEvent } from "@fan-tickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated
}