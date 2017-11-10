import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopPageComponent } from './pages/top-page/top-page.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: TopPageComponent,
  },
  {
    path: 'login',
    canActivate: [AuthGuard],
    component: LoginComponent,
    // Doesn't work in FF!?
    // loadChildren: './pages/login/login.module#LoginModule'
  },
  {
    path: 'signup',
    canActivate: [AuthGuard],
    component: SignupComponent,
    // Doesn't work in FF!?
    // loadChildren: './pages/login/login.module#LoginModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
