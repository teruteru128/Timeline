import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from '../../../shared/button/button.module';
import { PostCardModule } from '../../../shared/post-card/post-card.module';
import { NewPostModule } from '../../../shared/new-post/new-post.module';

@NgModule({
  imports: [
    CommonModule,
    PostCardModule,
    FormsModule,
    ButtonModule,
    NewPostModule
  ],
  declarations: [
    TimelineComponent
  ],
  exports: [
    TimelineComponent
  ],
  providers: [
  ]
})
export class TimelineModule { }
