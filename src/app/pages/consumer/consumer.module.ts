import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopPageComponent } from './top-page/top-page.component';
import { TimelineModule } from './timeline/timeline.module';
import { ConsumerRouting } from './consumer-routing.module';
import { TopPageModule } from './top-page/top-page.module';
import { RouterModule } from '@angular/router';
import { UnionModule } from './union/union.module';

@NgModule({
  imports: [
    CommonModule,
    TimelineModule,
    TopPageModule,
    ConsumerRouting,
    RouterModule,
    UnionModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class ConsumerModule { }
