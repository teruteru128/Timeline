import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnionComponent } from './union.component';
import { PostCardModule } from '../../../shared/post-card/post-card.module';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from '../../../shared/button/button.module';
import { NewPostModule } from '../../../shared/new-post/new-post.module';

@NgModule({
  imports: [
    CommonModule,
    PostCardModule,
    FormsModule,
    ButtonModule,
    NewPostModule
  ],
  declarations: [UnionComponent],
  exports: [UnionComponent]
})
export class UnionModule { }
