import { Validators } from '@angular/forms';

export const required = Validators.required;
export const min = (length: number) => Validators.minLength(length);
export const max = (length: number) => Validators.maxLength(length);
export const length = (length: number) => [min(length), max(length)];
