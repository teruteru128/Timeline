import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline.component';
import { PostCardModule } from '../post-card/post-card.module';
import { LoginModule } from '../../pages/login/login.module';

@NgModule({
  imports: [
    CommonModule,
    PostCardModule,
    LoginModule
  ],
  declarations: [
    TimelineComponent
  ],
  exports: [
    TimelineComponent
  ]
})
export class TimelineModule { }
