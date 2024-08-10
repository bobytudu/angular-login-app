import { Component, NgModule } from '@angular/core';
import { HlmInputDirective } from '../../ui-components/ui-input-helm/src';
import { HlmButtonDirective } from '../../ui-components/ui-button-helm/src';
import { HlmLabelDirective } from '../../ui-components/ui-label-helm/src';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FormState } from '../../store/forms.reducer';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  checkIfEmailExists,
  getLocalUsers,
  validateEmailAndPassword,
} from '../../helper/helper';
import * as yup from 'yup';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    HlmInputDirective,
    HlmButtonDirective,
    HlmLabelDirective,
    FormsModule,
    NgIf,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  step = 1;
  password: string = '';
  email: string = '';
  errorMessage: { name: string; message: string } = { name: '', message: '' };
  validationSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  handleInput(event: any) {
    const { name, value } = event.target;

    this.errorMessage = { name: '', message: '' };

    console.log(this.errorMessage);
  }

  async onSubmit() {
    // Handle successful submission (e.g., send to a service)
    try {
      await this.validationSchema.validate({
        email: this.email,
        password: this.password,
      });
      const authenticated = validateEmailAndPassword(this.email, this.password);
      console.log({
        authenticated,
        email: this.email,
        password: this.password,
        // localUsers,
      });
      if (authenticated) {
        this.step = 2;
      } else {
        this.errorMessage = {
          name: 'password',
          message: 'Invalid password',
        };
      }
    } catch (error: any) {
      this.errorMessage = { name: error.path, message: error.message };
    }
  }
}
