import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCardComponent } from './post-card.component';
import { DateService } from '../../services/date/date.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PostCardComponent
  ],
  exports: [
    PostCardComponent
  ],
  providers: [
    DateService
  ]
})
export class PostCardModule { }
