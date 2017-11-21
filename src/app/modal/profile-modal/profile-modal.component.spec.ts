import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileModalComponent } from './profile-modal.component';
import { FollowService } from '../../services/rest/follow/follow.service';
import { StorageService } from '../../services/storage/storage.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APP_CONFIG, APP_DI_CONFIG } from '../../app.config';
import { User, Post } from '../../services/rest/models';
import { Observable } from 'rxjs/Observable';
import { ModalService } from '../../shared/modal/modal.service';

describe('ProfileModalComponent', () => {
  let component: ProfileModalComponent;
  let fixture: ComponentFixture<ProfileModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [ProfileModalComponent],
      providers: [
        FollowService,
        { provide: APP_CONFIG, useValue: APP_DI_CONFIG },
        { provide: StorageService, useClass: StorageServiceMock },
        { provide: FollowService, useClass: FollowServiceMock },
        ModalService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileModalComponent);
    component = fixture.componentInstance;
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
      userId: 'kitten',
      postId: '',
      text: '',
      createdDate: new Date(),
      user: user
    };
    component.user = post.user;
    fixture.detectChanges();
  });

  it('isOwnPost true', async(() => {
    
    const b = component.isOwnPost();
    expect(b).toBe(true);
  }));

  it('isOwnPost false', async(() => {
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
      userId: 'kotten',
      postId: '',
      text: '',
      createdDate: new Date(),
      user: user
    };
    component.user = post.user;
    fixture.detectChanges();
    const b = component.isOwnPost();
    expect(b).toBe(false);
  }));

  it('checkFollow', async(() => {
    component.checkFollow().subscribe((b) => expect(b).toBe(true));
  }));

  it('checkFollowState', async(() => {
    component.getFollowState().subscribe((text) => expect(text).toBe('Remove'));
  }));
});

class StorageServiceMock extends StorageService {
  dummyResp = {
    'userId': 'kitten'
  };

  fetch(user: string): Object[] {
    const dummyJson = JSON.stringify(this.dummyResp);
    return JSON.parse(dummyJson) || [];
  }
}

class FollowServiceMock extends FollowService {
  checkFollowing(): Observable<boolean> {
    return new Observable<boolean>(obs => obs.next(true));
  }
}
