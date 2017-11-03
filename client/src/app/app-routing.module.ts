import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopPageComponent } from './pages/top-page/top-page.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: TopPageComponent,
  },
  {
    path: 'login',
    component: LoginComponent
    // Doesn't work in FF!?
    // loadChildren: './pages/login/login.module#LoginModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
