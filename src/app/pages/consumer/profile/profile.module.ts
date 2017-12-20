import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import {PostCardModule} from '../../../shared/post-card/post-card.module';
import { FormsModule } from '@angular/forms';
import { AutolinkModule } from '../../../shared/pipes/autolink/autolink.module';
import { SystemCardModule } from '../../../shared/system-card/system-card.module';

@NgModule({
  imports: [
    CommonModule,
    PostCardModule,
    FormsModule,
    AutolinkModule,
    SystemCardModule
  ],
  declarations: [ProfileComponent],
  exports: [ProfileComponent]
})
export class ProfileModule { }
