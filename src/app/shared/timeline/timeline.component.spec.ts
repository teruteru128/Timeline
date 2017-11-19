import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineComponent } from './timeline.component';
import { PostCardModule } from '../post-card/post-card.module';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../services/rest/post/post.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SocketIOService } from '../../services/socketio/socket-io.service';
import { APP_DI_CONFIG, APP_CONFIG } from '../../app.config';
import { StorageService } from '../../services/storage/storage.service';
import { NewPostComponent } from '../new-post/new-post.component';
import { ButtonModule } from '../button/button.module';
import { Observable } from 'rxjs/Observable';
import { Post, User } from '../../services/rest/models';
import { ModalModule } from '../modal/modal.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('TimelineComponent', () => {
  let component: TimelineComponent;
  let fixture: ComponentFixture<TimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        PostCardModule,
        FormsModule,
        HttpClientTestingModule,
        ModalModule,
        ButtonModule,
        RouterTestingModule
      ],
      declarations: [
        TimelineComponent,
        NewPostComponent
      ],
      providers: [
        SocketIOService,
        {provide: APP_CONFIG, useValue: APP_DI_CONFIG},
        {provide: PostService, useClass: PostServiceMock},
        StorageService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('checkStream', async(() => {
    expect(component.posts.length).toBe(1);
  }));

  class PostServiceMock extends PostService {
    listen(): Observable<Post> {
      return new Observable(observer => {
        const user: User = {
          id: '1',
          userId: 'testuser',
          displayName: 'Test User',
          postsCount: 0,
          location: '',
          following: [],
          followers: [],
          websiteUrl: '',
          avatarUrl: '/assets/img/logo.png',
          official: false
        };
        const post: Post = {
          userId: 'Test User',
          postId: '1',
          text: 'Text',
          createdDate: new Date('2017/01/01 00:00:00'),
          user: user
        };
        observer.next(post);
      });
    }
  }
});
