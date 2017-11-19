import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopPageComponent } from './top-page.component';
import { TimelineModule } from '../../shared/timeline/timeline.module';
import { HeaderModule } from '../../shared/header/header.module';
import { LeftSidebarModule } from '../../shared/left-sidebar/left-sidebar.module';
import { FollowService } from '../../services/rest/follow/follow.service';
import { StorageService } from '../../services/storage/storage.service';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    TimelineModule,
    HeaderModule,
    LeftSidebarModule
  ],
  declarations: [
    TopPageComponent
  ],
  exports: [
    TopPageComponent
  ],
  providers: [
    FollowService,
    StorageService
  ]
})
export class TopPageModule { }
