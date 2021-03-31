import { TypedFormGroup } from '../typed-forms';
import { required, length } from '../validations/validations';
import { Address } from './address';

export class AddressForm extends TypedFormGroup<Address> {
  readonly addressLine1 = this.getFormControl('addressLine1');
  readonly city = this.getFormControl('city');
  readonly state = this.getFormControl('state');
  readonly postalCode = this.getFormControl('postalCode');

  constructor(readonly model: Address) {
    super({
      controls: {
        addressLine1: [model.addressLine1, required],
        city: [model.city, required],
        state: [model.state, [required, ...length(2)]],
        postalCode: [model.postalCode, [required, ...length(5)]],
      },
    });
  }
}
