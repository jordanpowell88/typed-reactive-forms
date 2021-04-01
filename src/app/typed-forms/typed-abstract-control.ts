import { AbstractControl, AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormOperationOptions } from './form-operation-options';
import { Status } from './status';
import { TypedFormArray } from './typed-form-array';
import { TypedFormGroup } from './typed-form-group';

export abstract class TypedAbstractControl<T> extends AbstractControl {
  get typedValue(): T {
    return this.value;
  }

  protected constructor(
    validators: ValidatorFn | ValidatorFn[] | null,
    asyncValidators: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(validators, asyncValidators);
  }

  getTyped(path: Extract<keyof T, string>): TypedAbstractControl<T> {
    return this.get(path) as TypedAbstractControl<T>;
  }

  get typedParent(): TypedFormGroup<T> | TypedFormArray<T> | null {
    return this.parent as TypedFormGroup<T> | TypedFormArray<T> | null;
  }

  get typedStatus(): Status {
    return this.status as Status;
  }

  get typedValueChanges(): Observable<T> {
    return this.valueChanges.pipe(map((value) => value as T));
  }

  get typedStatusChanges(): Observable<Status> {
    return this.statusChanges.pipe(map((value) => value as Status));
  }

  setTypedParent(parent: TypedFormGroup<T> | TypedFormArray<T>): void {
    this.setParent(parent);
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
