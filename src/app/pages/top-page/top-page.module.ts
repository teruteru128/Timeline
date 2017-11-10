import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopPageComponent } from './top-page.component';
import { TimelineModule } from '../../shared/timeline/timeline.module';
import { LoginModule } from '../login/login.module';
import { SignupModule } from '../signup/signup.module';

@NgModule({
  imports: [
    CommonModule,
    TimelineModule
  ],
  declarations: [
    TopPageComponent
  ],
  exports: [
    TopPageComponent
  ]
})
export class TopPageModule { }
