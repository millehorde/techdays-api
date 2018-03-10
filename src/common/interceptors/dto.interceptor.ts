import { ExecutionContext, HttpStatus, Interceptor, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DECORATORS } from '@nestjs/swagger/constants';
import { Request } from 'express';
import * as _ from 'lodash';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { castToDto } from '../miscellaneous/dto-casting.tools';
import { Newable } from '../miscellaneous/generics-types';

@Interceptor()
export class DtoInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(req: Request, context: ExecutionContext, stream$: Observable<any>): Observable<any> {
    const { handler } = context;
    const apiResponseMetadata: object | undefined = this.reflector.get(DECORATORS.API_RESPONSE, handler);

    if (!apiResponseMetadata) {
      throw new Error('Missing decorator @ApiResponse');
    }

    const apiValidResponse = _.get(apiResponseMetadata, HttpStatus.OK) || _.get(apiResponseMetadata, HttpStatus.CREATED);

    if (!apiValidResponse) {
      throw new Error('Missing a "status" 200 or 201 in @ApiResponse');
    }

    const responseType = _.get(apiValidResponse, 'type');
    const isArray = _.get(apiValidResponse, 'isArray', false);

    if (!responseType) {
      throw new Error('Missing a "type" in @ApiResponse');
    }

    return stream$.map((ret: Newable | Newable[]) => {
      return castToDto(ret, responseType);
    });
  }
}
