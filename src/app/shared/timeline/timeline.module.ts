import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline.component';
import { PostCardModule } from '../post-card/post-card.module';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../services/rest/post/post.service';
import { SocketIOService } from '../../services/socketio/socket-io.service';
import { NewPostComponent } from '../new-post/new-post.component';
import { ButtonModule } from '../button/button.module';
import { ModalService } from '../modal-service/modal.service';
import { ModalModule } from '../modal/modal.module';

@NgModule({
  imports: [
    CommonModule,
    PostCardModule,
    FormsModule,
    ButtonModule,
    ModalModule
  ],
  declarations: [
    TimelineComponent,
    NewPostComponent
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
