import { FormArray, FormBuilder } from '@angular/forms';
import { FormConfig } from './form-config';
import { FormOperationOptions } from './form-operation-options';
import { TypedAbstractControl } from './typed-abstract-control';

export class TypedFormArray<T> extends FormArray {
  constructor(readonly configs: FormConfig<T>[], fb = new FormBuilder()) {
    super(fb.array(configs).controls);
  }

  pushTyped(control: TypedAbstractControl<T>): void {
    this.push(control);
  }

  insertTyped(index: number, control: TypedAbstractControl<T>): void {
    this.insert(index, control);
  }

  setTypedControl(index: number, control: TypedAbstractControl<T>): void {
    this.setControl(index, control);
  }

  setTypedValue(value: T[], options: Partial<FormOperationOptions>): void {
    this.setValue(value, options);
  }

  patchTypedValue(value: T[], options: Partial<FormOperationOptions>): void {
    this.patchValue(value, options);
  }

  typedReset(value: T[], options: Partial<FormOperationOptions>): void {
    this.reset(value, options);
  }

  getTypedRawValue(): T[] {
    return this.getRawValue() as T[];
  }
}
