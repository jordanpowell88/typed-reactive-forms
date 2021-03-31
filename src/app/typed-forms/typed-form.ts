import {
  AbstractControl,
  AbstractControlOptions,
  AsyncValidatorFn,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

interface FormOperationOptions {
  onlySelf?: boolean;
  emitEvent?: boolean;
  emitModelToViewChange?: boolean;
  emitViewToModelChange?: boolean;
}

class TypedFormControl<T> extends FormControl {
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

interface FormConfig<T> {
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

abstract class TypedFormGroup<T> extends FormGroup {
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

const required = Validators.required;
const min = (length: number) => Validators.minLength(length);
const max = (length: number) => Validators.maxLength(length);
const length = (length: number) => [min(length), max(length)];

type State = 'OH' | 'IN' | 'MI';

interface Address {
  addressLine1: string;
  city: string;
  state: State;
  postalCode: number;
}
interface MailingAddress extends Address {
  addressLine2?: string;
}

export class AddressForm extends TypedFormGroup<MailingAddress> {
  readonly addressLine1 = this.getFormControl('addressLine1');
  readonly city = this.getFormControl('city');
  readonly state = this.getFormControl('state');
  readonly postalCode = this.getFormControl('postalCode');

  constructor(readonly model: MailingAddress, fb = new FormBuilder()) {
    super({
      controls: {
        addressLine1: [model.addressLine1, required],
        city: [model.city, required],
        state: [model.state, [required, ...length(2)]],
        postalCode: [model.postalCode, [required, ...length(5)]],
      },
    });

    if (!!model.addressLine2) {
      this.addTypedControl('addressLine2', fb.control(model.addressLine2));
    }
  }
}

// interface Address {
//   addressLine1: string;
//   city: string;
//   state: State;
//   postalCode: number;
// }
// interface MailingAddress extends Address {
//   addressLine2?: string;
// }

// export class AddressForm<T = {}> extends TypedFormGroup<Address & T> {
//   readonly addressLine1 = this.getFormControl('addressLine1');
//   readonly city = this.getFormControl('city');
//   readonly state = this.getFormControl('state');
//   readonly postalCode = this.getFormControl('postalCode');

//   constructor(readonly model: Address & T) {
//     super({
//       controls: {
//         addressLine1: model.addressLine1,
//         city: model.city,
//         state: model.state,
//         postalCode: model.postalCode,
//       },
//     });

//     this.addressLine1.setValidators(required);
//     this.city.setValidators(required);
//     this.state.setValidators([required, ...length(2)]);
//     this.postalCode.setValidators(length(5));
//   }
// }

// class MailingAddressForm extends AddressForm<MailingAddress> {
//   readonly addressLine2 = this.getFormControl('addressLine2');

//   constructor(model: MailingAddress) {
//     super(model);
//   }
// }
