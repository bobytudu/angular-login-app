import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LayoutComponent } from './layout/layout.component';
import { NgModule } from '@angular/core';
import { LucideAngularModule, Undo2 } from 'lucide-angular';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'sign-up', component: SignUpComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), LucideAngularModule.pick({ Undo2 })],
  exports: [RouterModule],
})
export class AppRoutingModule {}