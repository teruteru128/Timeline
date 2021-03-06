import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { PostCardModule } from '../../../shared/post-card/post-card.module';
import { UserService } from '../../../services/rest/user/user.service';
import { HttpClientModule } from '@angular/common/http';
import { StorageService } from '../../../services/storage/storage.service';
import { RouterTestingModule } from '@angular/router/testing';
import { PostService } from '../../../services/rest/post/post.service';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        PostCardModule,
        HttpClientModule,
        RouterTestingModule
      ],
      declarations: [ ProfileComponent ],
      providers: [
        UserService,
        StorageService,
        PostService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
