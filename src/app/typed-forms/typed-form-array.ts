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
}
