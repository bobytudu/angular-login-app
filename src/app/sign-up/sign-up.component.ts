import { Component } from '@angular/core';
import { HlmInputDirective } from '../../ui-components/ui-input-helm/src';
import { HlmButtonDirective } from '../../ui-components/ui-button-helm/src';
import { HlmLabelDirective } from '../../ui-components/ui-label-helm/src';
import { LucideAngularModule, Undo2 } from 'lucide-angular';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [HlmInputDirective, HlmButtonDirective, HlmLabelDirective],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

}
