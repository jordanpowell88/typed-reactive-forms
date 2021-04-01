import { AbstractControl, AsyncValidatorFn, ValidatorFn } from '@angular/forms';

export abstract class TypedAbstractControl<T> extends AbstractControl {
  protected constructor(
    validators: ValidatorFn | ValidatorFn[] | null,
    asyncValidators: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(validators, asyncValidators);
  }
}
