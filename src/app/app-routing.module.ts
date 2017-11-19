import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopPageComponent } from './pages/top-page/top-page.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { LoginComponent } from './pages/first-view/login/login.component';
import { SignupComponent } from './pages/first-view/signup/signup.component';
import { FirstViewRouting } from './pages/fv-routing-module';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: TopPageComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    FirstViewRouting
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
