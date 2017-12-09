import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupModule } from './signup/signup.module';
import { LoginModule } from './login/login.module';
import { UserService } from '../../services/rest/user/user.service';
import { RandomImageService } from './random-image/random-image.service';
import { WelcomeModule } from './welcome/welcome.module';

@NgModule({
  imports: [
    CommonModule,
    LoginModule,
    SignupModule,
    WelcomeModule
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
