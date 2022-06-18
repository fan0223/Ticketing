import { Subjects, ExpirationCompleteEvent, Publisher } from "@fan-tickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete
}