import {
  AbstractControlOptions,
  AsyncValidatorFn,
  ValidatorFn,
} from '@angular/forms';

export interface FormConfig<T> {
  controls: {
    [P in keyof T]:
      | T[P]
      | [T[P], ValidatorFn | ValidatorFn[] | null]
      | [
          T[P],
          ValidatorFn | ValidatorFn[] | null,
          AsyncValidatorFn | AsyncValidatorFn[] | null
        ];
  };
  validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null;
  asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null;
}
