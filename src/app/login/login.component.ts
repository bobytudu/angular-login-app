import { Component } from '@angular/core';
import { HlmInputDirective } from '../../ui-components/ui-input-helm/src';
import { HlmButtonDirective } from '../../ui-components/ui-button-helm/src';
import { HlmLabelDirective } from '../../ui-components/ui-label-helm/src';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HlmInputDirective, HlmButtonDirective, HlmLabelDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
