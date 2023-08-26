import {
  registerDecorator,
  type ValidationOptions,
  ValidatorConstraint,
  type ValidatorConstraintInterface,
  type ValidationArguments
} from 'class-validator'
import { genres } from '../../db/db.json'

@ValidatorConstraint({ async: true })
export class IsArrayValueAllowedConstraint implements ValidatorConstraintInterface {
  validate (arrayValues: string[], args: ValidationArguments): boolean {
    return arrayValues.every((val) => genres.includes(val))
  }
}

export function IsArrayValuesAllowed (validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsArrayValueAllowedConstraint
    })
  }
}
