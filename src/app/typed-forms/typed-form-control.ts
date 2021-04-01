import {
  AbstractControlOptions,
  AsyncValidatorFn,
  FormControl,
  ValidatorFn,
} from '@angular/forms';
import { FormOperationOptions } from './form-operation-options';

export class TypedFormControl<T> extends FormControl {
  constructor(
    readonly formState: T,
    validator?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(validator, asyncValidator);
  }

  setTypedValue(value: T, options?: Partial<FormOperationOptions>): void {
    this.setValue(value, options);
  }

  patchTypedValue(value: T, options?: Partial<FormOperationOptions>): void {
    this.patchValue(value, options);
  }

  typedReset(value?: T, options?: Partial<FormOperationOptions>): void {
    this.reset(value, options);
  }
}
