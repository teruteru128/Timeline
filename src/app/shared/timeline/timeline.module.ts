import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline.component';
import { PostCardModule } from '../post-card/post-card.module';

@NgModule({
  imports: [
    CommonModule,
    PostCardModule
  ],
  declarations: [
    TimelineComponent
  ],
  exports: [
    TimelineComponent
  ]
})
export class TimelineModule { }
