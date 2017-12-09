import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineModule } from './timeline/timeline.module';
import { ConsumerRouting } from './consumer-routing.module';
import { TopPageModule } from './top-page/top-page.module';
import { RouterModule } from '@angular/router';
import { UnionModule } from './union/union.module';
import { ProfileModule } from './profile/profile.module';
import { WebSocketService } from '../../services/websocket/web-socket.service';
import { LikeService } from '../../services/rest/like/like.service';
import { StorageService } from '../../services/storage/storage.service';
import { PostService } from '../../services/rest/post/post.service';
import { FollowService } from '../../services/rest/follow/follow.service';
import { NotificationsModule } from './notifications/notifications.module';
import { LogoutModule } from './logout/logout.module';

@NgModule({
  imports: [
    CommonModule,
    TimelineModule,
    TopPageModule,
    ConsumerRouting,
    RouterModule,
    UnionModule,
    ProfileModule,
    NotificationsModule,
    LogoutModule
  ],
  declarations: [
  ],
  exports: [
  ],
  providers: [
    WebSocketService,
    LikeService,
    StorageService,
    PostService,
    FollowService
  ]
})
export class ConsumerModule { }
