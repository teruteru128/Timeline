import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from '../../../shared/button/button.module';
import { ModalModule } from '../../../shared/modal/modal.module';
import { NewPostComponent } from '../../../shared/new-post/new-post.component';
import { PostCardModule } from '../../../shared/post-card/post-card.module';
import { PostService } from '../../../services/rest/post/post.service';
import { ModalService } from '../../../shared/modal/modal.service';
import { SocketIOService } from '../../../services/socketio/socket-io.service';
import { NewPostModule } from '../../../shared/new-post/new-post.module';

@NgModule({
  imports: [
    CommonModule,
    PostCardModule,
    FormsModule,
    ButtonModule,
    ModalModule,
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
    SocketIOService,
    ModalService
  ]
})
export class TimelineModule { }
