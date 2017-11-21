import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupModule } from './signup/signup.module';
import { LoginModule } from './login/login.module';
import { UserService } from '../../services/rest/user/user.service';
import { RandomImageService } from './random-image/random-image.service';
import { TopPageModule } from '../consumer/top-page/top-page.module';

@NgModule({
  imports: [
    CommonModule,
    LoginModule,
    SignupModule
  ],
  declarations: [],
  exports: [
    LoginModule,
    SignupModule
  ],
  providers: [
    UserService,
    RandomImageService
  ]
})
export class FirstViewModule { }
