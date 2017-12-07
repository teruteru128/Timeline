import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth/auth.guard';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FirstViewModule } from './pages/first-view/first-view.module';
import { StorageService } from './services/storage/storage.service';
import { TopPageModule } from './pages/consumer/top-page/top-page.module';

@NgModule({
  declarations: [
    AppComponent
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
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
