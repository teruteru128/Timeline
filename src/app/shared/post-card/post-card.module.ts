import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCardComponent } from './post-card.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PostCardComponent
  ],
  exports: [
    PostCardComponent
  ]
})
export class PostCardModule { }
