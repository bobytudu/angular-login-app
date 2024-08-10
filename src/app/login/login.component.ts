import { Component } from '@angular/core';
import { HlmInputDirective } from '../../ui-components/ui-input-helm/src';
import { HlmButtonDirective } from '../../ui-components/ui-button-helm/src';
import { HlmLabelDirective } from '../../ui-components/ui-label-helm/src';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FormState } from '../../store/forms.reducer';
import { NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  checkIfEmailExists,
  validateEmailAndPassword,
} from '../../helper/helper';
import * as yup from 'yup';
import { setValue } from '../../store/forms.actions';

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
    email: yup.string().required(),
    password: yup.string().required(),
  });
  constructor(private store: Store<FormState>, private router: Router) {}

  ngOnInit() {
    this.store.select('forms').subscribe((state) => {
      this.email = state.email;
      this.password = state.password
    });
  }

  handleInput(event: any) {
    const { name, value } = event.target;
    this.errorMessage = { name: '', message: '' };
    this.store.dispatch(setValue({ key: name, value }));
  }

  async onSubmit() {
    // Handle successful submission (e.g., send to a service)
    try {
      const userExists = checkIfEmailExists(this.email);
      if (!userExists) {
        this.router.navigate(['/sign-up']);
      }
      await this.validationSchema.validate({
        email: this.email,
        password: this.password,
      });
      const authenticated = validateEmailAndPassword(this.email, this.password);
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
