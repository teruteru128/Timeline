import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  ]
})
export class TopPageModule { }
