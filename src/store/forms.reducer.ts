import { createReducer, createSelector, on } from '@ngrx/store';
import { setEmail, setValue } from './forms.actions';

export interface FormState {
  email: string;
  phone: string;
  org_name: string;
  org_id: string;
  designation: string;
  dob: string;
  city: string;
  pincode: string;
}

export const initialState: FormState = {
  email: '123@gmail.com',
  phone: '',
  org_name: '',
  org_id: '',
  designation: '',
  dob: '',
  city: '',
  pincode: '',
};

export const formReducer = createReducer(
  initialState,
  on(setEmail, (state, { email }) => ({ ...state, email })),
  on(setValue, (state, { key, value }) => ({ ...state, [key]: value }))
);

export const formSelectors = createSelector(
  (state: { forms: FormState }) => state.forms,
  (forms) => forms
);

export const emailSelectors = createSelector(
  (state: { forms: FormState }) => state.forms.email,
  (email) => email
);
