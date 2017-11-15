import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline.component';
import { PostCardModule } from '../post-card/post-card.module';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../services/rest/post/post.service';
import { SocketIOService } from '../../services/socketio/socket-io.service';

@NgModule({
  imports: [
    CommonModule,
    PostCardModule,
    FormsModule
  ],
  declarations: [
    TimelineComponent
  ],
  exports: [
    TimelineComponent
  ],
  providers: [
    PostService,
    SocketIOService
  ]
})
export class TimelineModule { }
