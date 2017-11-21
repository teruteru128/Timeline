import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftSidebarComponent } from './left-sidebar.component';
import { RouterModule, RouterLinkActive } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    LeftSidebarComponent
  ],
  exports: [LeftSidebarComponent]
})
export class LeftSidebarModule { }
