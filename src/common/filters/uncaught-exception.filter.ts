import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';
import * as _ from 'lodash';

/**
 * Catch any uncaught exception to report non-HttpException (most
 * likely unexpected errors) with the logger.
 */
@Catch()
export class UncaughtExceptionFilter implements ExceptionFilter {
  static DEFAULT_MESSAGE = 'Unexpected error';

  catch(exception: Error | HttpException | any = {}, res: Response) {
    let { message } = exception;
    const statusCode = exception instanceof HttpException ? exception.getStatus() : 500;

    if (!(exception instanceof HttpException)) {
      // this is not a HttpException => most likely an unexpected exception, log it
      global.console.error(message, exception);
    } else {
      const errResponse = exception.getResponse();
      message = typeof errResponse === 'string' ? errResponse : _.get(errResponse, 'message') || _.get(errResponse, 'error');
    }

    message = message || UncaughtExceptionFilter.DEFAULT_MESSAGE;
    res.status(statusCode).json({ message, statusCode });
  }
}
