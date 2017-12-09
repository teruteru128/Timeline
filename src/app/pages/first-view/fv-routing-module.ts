import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guards/auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { WelcomeComponent } from './welcome/welcome.component';
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
  },
  {
    path: 'welcome',
    canActivate: [AuthGuard],
    component: WelcomeComponent
  }
];

export const FirstViewRouting = RouterModule.forChild(routes);
