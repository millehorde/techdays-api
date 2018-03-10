import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';
import * as _ from 'lodash';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, response: Response) {
    const statusCode = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const exceptionMessage = _.get(exceptionResponse, 'message');
    const message = exceptionMessage;

    global.console.info('[HTTP]', exception);

    response.status(statusCode).json({
      message,
      error: _.get(exceptionResponse, 'error', undefined),
      statusCode,
    });
  }
}
