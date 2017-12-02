import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from '../../../shared/button/button.module';
import { PostCardModule } from '../../../shared/post-card/post-card.module';
import { PostService } from '../../../services/rest/post/post.service';
import { NewPostModule } from '../../../shared/new-post/new-post.module';
import {SocketIOService} from '../../../services/socketio/socket-io.service';

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
    PostService,
    SocketIOService
  ]
})
export class TimelineModule { }
