import { ArgumentMetadata, BadRequestException, Pipe, PipeTransform } from '@nestjs/common';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

/**
 * Responsible for validating DTO instances according to the
 * constraints defined in their class. Unexpected properties
 * of dtoInstance (class properties without decorators) are
 * automatically stripped (option `whitelist`).
 */
@Pipe()
export class DtoValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metatype || !this.shouldBeValidated(metatype)) {
      return value;
    }

    const dtoInstance: any = plainToClass(metatype, value);
    const errors = await validate(dtoInstance, { whitelist: true });
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return dtoInstance;
  }

  private shouldBeValidated(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => metatype === type) && !isNil(metatype);
  }
}
