import { FormBuilder } from '@angular/forms';
import {
  TypedFormBuilder,
  TypedFormControl,
  TypedFormGroup,
} from '../typed-forms';
import { required, length } from '../validations/validations';
import { Address } from './address';

interface IAddressForm extends Address {
  someCheckbox: boolean;
  addressLine2?: string;
}

export class AddressForm extends TypedFormGroup<IAddressForm> {
  readonly addressLine1 = this.getFormControl('addressLine1');
  readonly city = this.getFormControl('city');
  readonly state = this.getFormControl('state');
  readonly postalCode = this.getFormControl('postalCode');

  constructor(
    readonly model: Address,
    fb = new TypedFormBuilder<IAddressForm>()
  ) {
    super({
      controls: {
        addressLine1: [model.addressLine1, required],
        city: [model.city, required],
        state: [model.state, [required, ...length(2)]],
        postalCode: [model.postalCode, [required, ...length(5)]],
        someCheckbox: [false, required],
      },
    });

    this.addTypedControl('addressLine2', fb.control(null, required));
    // this.addTypedControl('addressLine2', new TypedFormControl(null, required));
  }
}
