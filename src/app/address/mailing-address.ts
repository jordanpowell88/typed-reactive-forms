import { Address } from './address';

export interface MailingAddress extends Address {
  addressLine2?: string;
}
