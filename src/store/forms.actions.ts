import { createAction, props } from '@ngrx/store';
import { FormState } from './forms.reducer';

export const setEmail = createAction(
  '[Email] Set Email',
  props<FormState>()
);

export const setValue = createAction(
  '[Value] Set Value',
  props<{ key: string, value: string }>()
);