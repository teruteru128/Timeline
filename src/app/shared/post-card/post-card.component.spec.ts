import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCardComponent } from './post-card.component';
import { Post, User } from '../../services/rest/models';
import { DateService } from '../../services/date/date.service';

describe('PostCardComponent', () => {
  let component: PostCardComponent;
  let fixture: ComponentFixture<PostCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostCardComponent ],
      providers: [
        DateService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCardComponent);
    component = fixture.componentInstance;
    const user: User = {
      id: '1',
      userId: 'testuser',
      displayName: 'Test User',
      postsCount: 0,
      location: '',
      following: [],
      followers: [],
      websiteUrl: '',
      avatarUrl: '',
      official: false
    };
    const post: Post = {
      userId: 'Test User',
      postId: '1',
      text: 'Text',
      createdDate: new Date('2017/01/01 00:00:00'),
      user: user
    };
    component.post = post;
    fixture.detectChanges();
  });

  it('notProvidedImage', async(() => {
    component.notProvidedImage();
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
    const compPost = component.post;

    expect(JSON.stringify(compPost)).toBe(JSON.stringify(post));
  }));

  it('profileClick', async(() => {
    component.profileClick();
    component.profileClicked.subscribe(post => {
      expect(post).toBe(component.post);
    });
  }));

});
