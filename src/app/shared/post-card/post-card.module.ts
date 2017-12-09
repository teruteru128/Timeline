import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCardComponent } from './post-card.component';
import { DateService } from '../../services/date/date.service';
import { AutolinkModule } from '../pipes/autolink/autolink.module';

@NgModule({
  imports: [
    CommonModule,
    AutolinkModule
  ],
  declarations: [
    PostCardComponent
  ],
  exports: [
    PostCardComponent
  ]
})
export class PostCardModule { }
