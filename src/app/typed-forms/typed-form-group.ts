import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { FormConfig } from './form-config';
import { FormOperationOptions } from './form-operation-options';
import { TypedAbstractControl } from './typed-abstract-control';
import { TypedFormArray } from './typed-form-array';
import { TypedFormControl } from './typed-form-control';

export class TypedFormGroup<T> extends FormGroup {
  constructor(
    { controls, validatorOrOpts, asyncValidator }: FormConfig<T>,
    fb = new FormBuilder()
  ) {
    const group = fb.group(controls);
    super(group.controls, validatorOrOpts, asyncValidator);
  }

  getTyped(name: Extract<keyof T, string>): TypedAbstractControl<T> | null {
    return this.get(name) as TypedAbstractControl<T>;
  }

  registerTypedControl(
    name: Extract<keyof T, string>,
    control: TypedAbstractControl<T>
  ): TypedAbstractControl<T> {
    return this.registerControl(name, control) as TypedAbstractControl<T>;
  }

  addTypedControl(
    name: Extract<keyof T, string>,
    control: TypedAbstractControl<T>
  ): void {
    this.addControl(name, control);
  }

  removeTypedControl(name: Extract<keyof T, string>): void {
    this.removeControl(name);
  }

  setTypedControl(
    name: Extract<keyof T, string>,
    control: TypedAbstractControl<T>
  ): void {
    this.setControl(name, control);
  }

  containsTyped(controlName: Extract<keyof T, string>): boolean {
    return this.contains(controlName);
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

  getTypedRawValue(): T {
    return this.getRawValue() as T;
  }

  // MY HELPERs
  getControl(name: Extract<keyof T, string>): TypedAbstractControl<T> {
    return this.getTyped(name) as TypedAbstractControl<T>;
  }

  getFormControl(name: Extract<keyof T, string>): TypedFormControl<T> {
    return this.get(name) as TypedFormControl<T>;
  }

  getFormArray(name: Extract<keyof T, string>): TypedFormArray<T> {
    return this.get(name) as TypedFormArray<T>;
  }
}
