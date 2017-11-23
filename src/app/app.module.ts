import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { ProfileModalComponent } from './modal/profile-modal/profile-modal.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SignupModule } from './pages/first-view/signup/signup.module';
import { LoginModule } from './pages/first-view/login/login.module';
import { FirstViewModule } from './pages/first-view/first-view.module';
import { APP_CONFIG, APP_DI_CONFIG } from './app.config';
import { StorageService } from './services/storage/storage.service';
import { RouterModule } from '@angular/router';
import { ConsumerModule } from './pages/consumer/consumer.module';
import { TopPageModule } from './pages/consumer/top-page/top-page.module';
import { UnionModule } from './pages/consumer/union/union.module';

@NgModule({
  declarations: [
    AppComponent,
    ProfileModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FirstViewModule,
    TopPageModule
  ],
  providers: [
    AuthGuard,
    {provide: APP_CONFIG, useValue: APP_DI_CONFIG},
    StorageService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ProfileModalComponent
  ]
})
export class AppModule { }
