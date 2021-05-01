import {
  Catch,
  ArgumentsHost,
  InternalServerErrorException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { BaseError, ErrorType } from '../types/errors.types';

@Catch()
export class CustomExceptionFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    super.catch(this.mapToHttpException(exception), host);
  }

  private mapToHttpException(error: unknown) {
    if (error instanceof BaseError) {
      switch (error.type) {
        case ErrorType.IncorrectData:
          return new BadRequestException(error.message);
        case ErrorType.NotFound:
          return new NotFoundException(error.message);
        case ErrorType.InnerError:
          return new InternalServerErrorException(error.message);
        default:
          return error;
      }
    }
    return error;
  }
}
