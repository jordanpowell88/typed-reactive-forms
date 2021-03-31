import { BaseAddressForm } from './base-address-form';
import { MailingAddress } from './mailing-address';

class MailingAddressForm extends BaseAddressForm<MailingAddress> {
  readonly addressLine2 = this.getFormControl('addressLine2');

  //   constructor(model: MailingAddress) {
  //     super(model);
  //   }
}
