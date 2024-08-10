import { Component } from '@angular/core';
import { HlmInputDirective } from '../../ui-components/ui-input-helm/src';
import { HlmButtonDirective } from '../../ui-components/ui-button-helm/src';
import { HlmLabelDirective } from '../../ui-components/ui-label-helm/src';
import { Store } from '@ngrx/store';
import {
  FormState,
} from '../../store/forms.reducer';
import { setValue } from '../../store/forms.actions';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { HlmSelectImports } from '../../ui-components/ui-select-helm/src';
import * as yup from 'yup';
import { RouterModule } from '@angular/router';
import { getLocalUsers } from '../../helper/helper';
import { FieldsType } from '../../types/types';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    HlmInputDirective,
    HlmButtonDirective,
    HlmLabelDirective,
    NgIf,
    NgFor,
    FormsModule,
    HlmSelectImports,
    BrnSelectImports,
    RouterModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  fields: FieldsType[] = [
    {
      fullWidth: true,
      childrens: [
        {
          type: 'text',
          name: 'org_name',
          label: 'Organization Name',
          required: true,
          error: '',
          value: '',
          placeholder: 'Enter Organization Name',
          maxLength: 200,
        },
      ],
    },
    {
      fullWidth: true,
      childrens: [
        {
          type: 'select',
          name: 'designation',
          label: 'Designation',
          required: true,
          error: '',
          value: '',
          placeholder: 'Select Designation',
          maxLength: 200,
        },
      ],
    },
    {
      fullWidth: true,
      childrens: [
        {
          type: 'date',
          name: 'dob',
          label: 'Date of Birth',
          required: true,
          error: '',
          value: '',
          placeholder: 'Enter Date of Birth',
          maxLength: 200,
        },
      ],
    },
    {
      fullWidth: false,
      childrens: [
        {
          type: 'text',
          name: 'city',
          label: 'City',
          required: true,
          error: '',
          value: '',
          placeholder: 'Enter City',
          maxLength: 200,
        },
        {
          type: 'text',
          name: 'pincode',
          label: 'Pincode',
          maxLength: 6,
          error: '',
          value: '',
          required: true,
          placeholder: 'Enter Pincode',
        },
      ],
    },
  ];
  step = 1;
  errorMessage: { name: string; message: string } = { name: '', message: '' };

  fieldData: FormState = {
    email: '',
    phone: '',
    org_name: '',
    org_id: '',
    designation: '',
    dob: '',
    city: '',
    pincode: '',
    name: '',
    password: '',
  }
  allowed_orgs = ['Google', 'Microsoft', 'Facebook', 'Amazon'];
  validationSchema = yup.object({
    email: yup.string().required(),
    password: yup.string().min(4).required(),
  });

  constructor(private store: Store<{ forms: FormState }>) {}

  ngOnInit() {
    this.store.select('forms').subscribe((state) => {
      this.fieldData = state;
    });
  }

  handleInput(event: any) {
    const { value, id: name } = event.target;
    if (name === 'pincode') {
      //pincode validation
      const numericValue = value.replace(/[^0-9]/g, '');
      if (numericValue !== value) {
        event.target.value = numericValue;
      }
      this.store.dispatch(setValue({ key: name, value }));
    } else if (name === 'org_name') {
      // org_name validation
      if (!this.allowed_orgs.includes(value)) {
        this.errorMessage = {
          name: 'org_name',
          message: 'Organization not allowed',
        };
      } else {
        this.errorMessage = { name: '', message: '' };
        this.store.dispatch(setValue({ key: name, value }));
      }
    } else {
      (this as any)[name] = value;
      event.target.value = value;
      this.fieldData = { ...this.fieldData, [name]: value };
      this.errorMessage = { name: '', message: '' };
      this.store.dispatch(setValue({ key: name, value }));
    }
  }

  async validateData() {
    try {
      console.log(this.fieldData)
      const result = await this.validationSchema.validate({
        email: this.fieldData.email,
        password: this.fieldData.password,
      });
      if (result) return true;
    } catch (error: any) {
      this.errorMessage = {
        name: error.path,
        message: error.message,
      };
    }
    return false;
  }

  goBack() {
    this.step--;
  }

  async goNext() {
    try {
      const localUsers = getLocalUsers();
      if (this.step === 1) {
        const valid = await this.validateData();
        const user = localUsers.find((u: any) => u.email === this.fieldData.email);
        if (user) {
          this.errorMessage = {
            name: 'email',
            message: 'User already exists',
          };
          return;
        }
        if (valid) {
          this.step++;
        }
      } else if (this.step === 2) {
        this.store.subscribe((state) => {
          localUsers.push(state.forms);
          localStorage.setItem('users', JSON.stringify(localUsers));
          this.step++;
        });
      }
    } catch (error: any) {
      this.errorMessage = {
        name: error.path,
        message: error.message,
      };
    }
  }

  onSubmit() {
    this.errorMessage = { name: '', message: '' };
  }
}
