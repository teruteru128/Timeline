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
    fixture.detectChanges();
  });

  it('notProvidedImage', async(() => {
    const user: User = {
      id: '',
      userId: '',
      displayName: '',
      postsCount: 0,
      location: '',
      following: [],
      followers: [],
      websiteUrl: '',
      avatarUrl: '',
      official: false
    };
    const post: Post = {
      userId: '',
      postId: '',
      text: '',
      createdDate: new Date(),
      user: user
    };

    component.post = post;
    component.notProvidedImage();
    expect(component.post.user.avatarUrl).toBe('/assets/img/logo.png');
  }));

  it('profileClick', async(() => {
    const user: User = {
      id: '',
      userId: '',
      displayName: '',
      postsCount: 0,
      location: '',
      following: [],
      followers: [],
      websiteUrl: '',
      avatarUrl: '',
      official: false
    };
    const post: Post = {
      userId: '',
      postId: '',
      text: '',
      createdDate: new Date(),
      user: user
    };
    component.post = post;

    component.profileClick();
  }));

});
