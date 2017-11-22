import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../guards/auth/auth.guard';
import { FindUserComponent } from './find-user.component';
import { HeaderModule } from '../../../shared/header/header.module';
import { LeftSidebarModule } from '../../../shared/left-sidebar/left-sidebar.module';
import { ModalModule } from '../../../shared/modal/modal.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HeaderModule,
    LeftSidebarModule,
    ModalModule
  ],
  declarations: [
    FindUserComponent
  ],
  exports: [
  ]
})
export class FindUserModule { }
