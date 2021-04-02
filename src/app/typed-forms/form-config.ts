import {
  AbstractControlOptions,
  AsyncValidatorFn,
  ValidatorFn,
} from '@angular/forms';
import { TypedFormArray } from './typed-form-array';
import { TypedFormGroup } from './typed-form-group';

export interface FormConfig<T> {
  controls: {
    [P in keyof T]:
      | (T[P] | TypedFormGroup<T[P]> | TypedFormArray<T[P]>)
      | [
          T[P] | TypedFormGroup<T[P]> | TypedFormArray<T[P]>,
          ValidatorFn | ValidatorFn[] | null
        ]
      | [
          T[P] | TypedFormGroup<T[P]> | TypedFormArray<T[P]>,
          ValidatorFn | ValidatorFn[] | null,
          AsyncValidatorFn | AsyncValidatorFn[] | null
        ];
  };
  validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null;
  asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null;
}
