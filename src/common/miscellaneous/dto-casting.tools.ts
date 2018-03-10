import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import * as _ from 'lodash';

import { Newable } from './generics-types';

/**
 * Cast `value` to desired `type` with striping
 *
 * @param {object} value
 * @param {Newable} type
 *
 * @returns {Promise<object>}
 */
export async function castToDto<T>(value: object, type: Newable<T>): Promise<T> {
  const entity = plainToClass(type, value);
  await validate(entity, { whitelist: true });
  return entity;
}

/**
 * Cast `values` to desired DTO `type` with stripping validation
 * (unexpected fields are stripped).
 *
 * @param {object[]} values Values to be casted/stripped.
 * @param {Newable<T>} type DTO class.
 *
 * @return {Promise<T[]>}
 */
// export function castToDtoArray<T>(values: object[], type: Newable<T>): Promise<T[]> {
//   return Promise.all(_.map(values, value => castToDto(value, type)));
// }
