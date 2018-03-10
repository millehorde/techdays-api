import { getFromContainer, MetadataStorage } from 'class-validator';
import * as _ from 'lodash';

/**
 * Allow copying validation metadatas set by `class-validator` from
 * a given Class property to an other. Copied `ValidationMetadata`s
 * will have their `target` and `propertyName` changed according to
 * the decorated class and property.
 *
 * @param fromClass    Class to inherit validation metadatas from.
 * @param fromProperty Name of the target property (default to decorated property).
 *
 * @return {PropertyDecorator} Responsible for copying and registering `ValidationMetada`s.
 *
 * @example
 * class SubDto {
 *   @InheritValidation(Dto)
 *   readonly id: number;
 *
 *   @InheritValidation(Dto, 'name')
 *   readonly firstName: string;
 *
 *   @InheritValidation(Dto, 'name')
 *   readonly lastName: string;
 * }
 */
export function InheritValidation(fromClass: new () => object, fromProperty?: string): PropertyDecorator {
    const metadataStorage = getFromContainer(MetadataStorage);
    const validationMetadatas = metadataStorage.getTargetValidationMetadatas(fromClass, typeof fromClass);

    /**
     * Change the `target` and `propertyName` of each `ValidationMetaData`
     * and add it to `MetadataStorage`. Thus, `class-validator` uses it
     * during validation.
     *
     * @param toClass    Class owning the decorated property.
     * @param toProperty Name of the decorated property.
     */
    return (toClass: object, toProperty: string | symbol) => {
        const toPropertyName: string = ((toProperty as any) instanceof Symbol ? typeof toProperty : toProperty) as string;

        const sourceProperty = fromProperty || toProperty;

        const metadatasCopy = _.cloneDeep(validationMetadatas.filter(vm => vm.target === fromClass && vm.propertyName === sourceProperty));

        metadatasCopy.forEach(vm => {
            vm.target = toClass.constructor;
            vm.propertyName = toPropertyName;
            metadataStorage.addValidationMetadata(vm);
        });
    };
}
