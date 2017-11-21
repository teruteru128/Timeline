import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindUserComponent } from './find-user/find-user.component';
import { TopPageComponent } from './top-page/top-page.component';
import { TimelineModule } from './timeline/timeline.module';
import { ConsumerRouting } from './consumer-routing.module';
import { FindUserModule } from './find-user/find-user.module';
import { TopPageModule } from './top-page/top-page.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    TimelineModule,
    FindUserModule,
    TopPageModule,
    ConsumerRouting,
    RouterModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class ConsumerModule { }
