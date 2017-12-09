import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsComponent } from './notifications.component';
import { EventService } from '../../../services/rest/event/event.service';
import { StorageService } from '../../../services/storage/storage.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../../../services/rest/user/user.service';
import { PostService } from '../../../services/rest/post/post.service';
import { WebSocketService } from '../../../services/websocket/web-socket.service';
import { LikeService } from '../../../services/rest/like/like.service';

describe('NotificationsComponent', () => {
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [ NotificationsComponent ],
      providers: [
        EventService,
        StorageService,
        UserService,
        PostService,
        WebSocketService,
        LikeService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
