import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';
import { AppComponent } from './app.component';
import {FirstViewRouting} from './pages/first-view/fv-routing-module';

const routes: Routes = [
    {
      path: '',
      canActivate: [AuthGuard],
      component: AppComponent,
      children: [
        {
          path: '',
          loadChildren: './pages/consumer/consumer.module#ConsumerModule'
        }
      ]
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
