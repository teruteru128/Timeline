import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineModule } from './timeline/timeline.module';
import { ConsumerRouting } from './consumer-routing.module';
import { TopPageModule } from './top-page/top-page.module';
import { RouterModule } from '@angular/router';
import { UnionModule } from './union/union.module';
import { ProfileModule } from './profile/profile.module';
import { WebSocketService } from '../../services/websocket/web-socket.service';

@NgModule({
  imports: [
    CommonModule,
    TimelineModule,
    TopPageModule,
    ConsumerRouting,
    RouterModule,
    UnionModule,
    ProfileModule
  ],
  declarations: [
  ],
  exports: [
  ],
  providers: [
    WebSocketService
  ]
})
export class ConsumerModule { }
