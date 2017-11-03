import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { UserService } from '../../services/rest/user/user.service';
import { HttpClientModule } from '@angular/common/http';
import { StorageService } from '../../services/storage/storage.service';
import { APP_CONFIG, APP_DI_CONFIG } from '../../app.config';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ],
  providers: [
    {provide: APP_CONFIG, useValue: APP_DI_CONFIG},
    UserService,
    StorageService
  ]
})
export class LoginModule { }
