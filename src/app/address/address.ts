export type State = 'OH' | 'IN' | 'MI';

export interface Address {
  addressLine1: string;
  city: string;
  state: State;
  postalCode: number;
}
