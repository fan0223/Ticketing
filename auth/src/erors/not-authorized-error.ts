import { CustomError } from "./custom-error";

export class NotAuthurizedError extends CustomError {
  statusCode = 401

  constructor() {

    super('Not Authorized')
    Object.setPrototypeOf(this, NotAuthurizedError.prototype)


  }

  serializeErrors(): { message: string; field?: string | undefined; }[] {
    return [{
      message: 'Not Authorized'
    }]
  }
}