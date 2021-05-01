export enum ErrorType {
  IncorrectData = 'Incorrect Data Error',
  NotFound = 'Not Found',
  InnerError = 'Inner Error',
}

export abstract class BaseError extends Error {
  constructor(public type: ErrorType, message: string) {
    super(message);
  }
}

export class InputError extends BaseError {
  constructor(message: string) {
    super(ErrorType.IncorrectData, message);
  }
}

export class InnerError extends BaseError {
  constructor(message: string) {
    super(ErrorType.InnerError, message);
  }
}

export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(ErrorType.NotFound, message);
  }
}
