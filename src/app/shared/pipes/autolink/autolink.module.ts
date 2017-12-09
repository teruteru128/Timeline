import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutolinkPipe } from './autolink.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AutolinkPipe
  ],
  exports: [
    AutolinkPipe
  ]
})
export class AutolinkModule { }
