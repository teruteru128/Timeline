import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPostComponent } from './new-post.component';
import { ButtonModule } from '../button/button.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule
  ],
  declarations: [
    NewPostComponent
  ],
  exports: [
    NewPostComponent
  ]
})
export class NewPostModule { }
