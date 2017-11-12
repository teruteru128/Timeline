import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopPageComponent } from './top-page.component';
import { TimelineModule } from '../../shared/timeline/timeline.module';
import { LoginModule } from '../login/login.module';
import { SignupModule } from '../signup/signup.module';
import { HeaderModule } from '../../shared/header/header.module';
import { LeftSidebarModule } from '../../shared/left-sidebar/left-sidebar.module';

@NgModule({
  imports: [
    CommonModule,
    TimelineModule,
    HeaderModule,
    LeftSidebarModule
  ],
  declarations: [
    TopPageComponent
  ],
  exports: [
    TopPageComponent
  ]
})
export class TopPageModule { }
