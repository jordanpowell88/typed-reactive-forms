import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { FormConfig } from './form-config';
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

  addTypedControl(
    name: Extract<keyof T, string>,
    control: AbstractControl
  ): void {
    this.addControl(name, control);
  }

  removeTypedControl(name: Extract<keyof T, string>): void {
    this.removeControl(name);
  }

  getControl(name: Extract<keyof T, string>): TypedAbstractControl<T> {
    return this.get(name) as TypedAbstractControl<T>;
  }

  getFormControl(name: Extract<keyof T, string>): TypedFormControl<T> {
    return this.get(name) as TypedFormControl<T>;
  }

  getFormArray(name: Extract<keyof T, string>): TypedFormArray<T> {
    return this.get(name) as TypedFormArray<T>;
  }
}
