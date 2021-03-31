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

interface FormConfig<T> {
  controls: {
    [P in keyof T]: T[P];
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

  protected getControl(name: Extract<keyof T, string>): AbstractControl {
    return this.get(name) as AbstractControl;
  }

  protected getFormControl(name: Extract<keyof T, string>): FormControl {
    return this.get(name) as FormControl;
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
  addressLine2?: string;
  city: string;
  state: State;
  postalCode: number;
}

export class AddressForm extends TypedFormGroup<Address> {
  readonly addressLine1 = this.getFormControl('addressLine1');
  readonly addressLine2 = this.getFormControl('addressLine2');
  readonly city = this.getFormControl('city');
  readonly state = this.getFormControl('state');
  readonly postalCode = this.getFormControl('postalCode');

  constructor(readonly model: Address) {
    super({
      controls: {
        addressLine1: model.addressLine1,
        addressLine2: model.addressLine2,
        city: model.city,
        state: model.state,
        postalCode: model.postalCode,
      },
    });

    this.addressLine1.setValidators(required);
    this.city.setValidators(required);
    this.state.setValidators([required, ...length(2)]);
    this.postalCode.setValidators(length(5));
  }
}
