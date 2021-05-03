import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

export function getValidator<T extends object>(
  EntitySchema: ClassConstructor<T>
) {
  return async function <V>(values: V): Promise<Record<string, string>> {
    const filmDTO = plainToClass(EntitySchema, values);
    const errors = await validate(filmDTO);
    return mapClassValidatorErrorsToFormik(errors);
  };
}

export function mapClassValidatorErrorsToFormik(
  errors: ValidationError[]
): Record<string, string> {
  return errors.reduce<Record<string, string>>((acc, error) => {
    if (error.constraints) {
      acc[error.property] = Object.values(error.constraints).join(',');
    }
    return acc;
  }, {});
}
