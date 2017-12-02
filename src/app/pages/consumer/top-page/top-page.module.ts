import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowService } from '../../../services/rest/follow/follow.service';
import { StorageService } from '../../../services/storage/storage.service';
import { RouterModule } from '@angular/router';
import { TopPageComponent } from './top-page.component';
import { HeaderModule } from '../../../shared/header/header.module';
import { LeftSidebarModule } from '../../../shared/left-sidebar/left-sidebar.module';
import { TimelineModule } from '../timeline/timeline.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HeaderModule,
    LeftSidebarModule,
    TimelineModule
  ],
  declarations: [
    TopPageComponent
  ],
  exports: [
  ],
  providers: [
    FollowService,
    StorageService
  ]
})
export class TopPageModule { }
