import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications.component';
import { EventService } from '../../../services/rest/event/event.service';
import { SystemCardModule } from '../../../shared/system-card/system-card.module';

@NgModule({
  imports: [
    CommonModule,
    SystemCardModule
  ],
  declarations: [NotificationsComponent],
  exports: [NotificationsComponent],
  providers: [
    EventService
  ]
})
export class NotificationsModule { }
