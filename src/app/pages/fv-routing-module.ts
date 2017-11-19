import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth/auth.guard';
import { LoginComponent } from './first-view/login/login.component';
import { SignupComponent } from './first-view/signup/signup.component';
const routes: Routes = [
  {
    path: 'login',
    canActivate: [AuthGuard],
    component: LoginComponent
  },
  {
    path: 'signup',
    canActivate: [AuthGuard],
    component: SignupComponent
  }
];

export const FirstViewRouting = RouterModule.forChild(routes);
