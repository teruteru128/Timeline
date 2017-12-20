import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemCardComponent } from './system-card.component';
import { PostCardModule } from '../post-card/post-card.module';

@NgModule({
  imports: [
    CommonModule,
    PostCardModule
  ],
  declarations: [SystemCardComponent],
  exports: [SystemCardComponent]
})
export class SystemCardModule { }
