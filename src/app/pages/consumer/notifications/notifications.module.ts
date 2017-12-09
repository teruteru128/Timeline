import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications.component';
import { EventService } from '../../../services/rest/event/event.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NotificationsComponent],
  exports: [NotificationsComponent],
  providers: [
    EventService
  ]
})
export class NotificationsModule { }
