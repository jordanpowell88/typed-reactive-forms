import { Validators } from '@angular/forms';
import { AddressForm } from '../address/address-form';
import { Taco } from '../taco/taco';
import { TypedFormGroup } from '../typed-forms';
import { TypedFormArray } from '../typed-forms/typed-form-array';
import { Customer } from './customer';

interface ICustomerForm extends Customer {
  iAgree: boolean;
  tacos: Taco[];
}

export class CustomerForm extends TypedFormGroup<ICustomerForm> {
  readonly firstName = this.getTyped('firstName');
  readonly lastName = this.getTyped('lastName');
  readonly email = this.getTyped('email');
  readonly iAgree = this.getTyped('iAgree');

  get Address(): AddressForm {
    return this.getFormGroup('address') as AddressForm;
  }

  get Tacos(): TypedFormArray<Taco> {
    return this.getFormArray('tacos') as TypedFormArray<Taco>;
  }

  constructor(customer: Customer = {} as Customer) {
    super({
      controls: {
        firstName: [customer.firstName, Validators.required],
        lastName: [customer.lastName, Validators.required],
        email: [customer.email, Validators.required],
        address: new AddressForm(customer.address),
        iAgree: [false, Validators.required],
        tacos: [],
      },
    });
  }
}
