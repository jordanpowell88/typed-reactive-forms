import { TypedFormGroup } from '../typed-forms';
import { required } from '../validations/validations';
import { Taco } from './taco';

export class TacoForm extends TypedFormGroup<Taco> {
  readonly meat = this.getTyped('meat');
  readonly toppings = this.getTyped('toppings');
  readonly type = this.getTyped('type');

  constructor(readonly taco: Taco) {
    super({
      controls: {
        meat: [taco.meat, required],
        toppings: taco.toppings,
        type: [taco.type, required],
      },
    });
  }
}
