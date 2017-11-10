import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { APP_CONFIG, APP_DI_CONFIG } from '../../app.config';
import { UserService } from '../../services/rest/user/user.service';
import { StorageService } from '../../services/storage/storage.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [
    SignupComponent
  ],
  exports: [
    SignupComponent
  ],
  providers: [
    {provide: APP_CONFIG, useValue: APP_DI_CONFIG},
    UserService,
    StorageService
  ]
})
export class SignupModule { }
