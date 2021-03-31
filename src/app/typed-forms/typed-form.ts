import {
  AbstractControl,
  AbstractControlOptions,
  AsyncValidatorFn,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';

interface FormOperationOptions {
  onlySelf?: boolean;
  emitEvent?: boolean;
  emitModelToViewChange?: boolean;
  emitViewToModelChange?: boolean;
}

export class TypedFormControl<T> extends FormControl {
  constructor(
    readonly formState: T,
    validator?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(validator, asyncValidator);
  }

  patchTypedValue(value: T, options?: FormOperationOptions): void {
    this.patchValue(value, options);
  }

  typedReset(value?: T, options?: FormOperationOptions): void {
    this.reset(value, options);
  }

  setTypedValue(value: T, options?: FormOperationOptions): void {
    this.setValue(value, options);
  }
}

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

export abstract class TypedFormGroup<T> extends FormGroup {
  protected constructor(
    { controls, validatorOrOpts, asyncValidator }: FormConfig<T>,
    fb = new FormBuilder()
  ) {
    const group = fb.group(controls);
    super(group.controls, validatorOrOpts, asyncValidator);
  }

  protected addTypedControl(
    name: Extract<keyof T, string>,
    control: AbstractControl
  ): void {
    this.addControl(name, control);
  }

  protected removeTypedControl(name: Extract<keyof T, string>): void {
    this.removeControl(name);
  }

  protected getControl(name: Extract<keyof T, string>): AbstractControl {
    return this.get(name) as AbstractControl;
  }

  protected getFormControl(name: Extract<keyof T, string>): FormControl {
    return this.get(name) as TypedFormControl<T>;
  }

  protected getFormArray(name: Extract<keyof T, string>): FormArray {
    return this.get(name) as FormArray;
  }
}
