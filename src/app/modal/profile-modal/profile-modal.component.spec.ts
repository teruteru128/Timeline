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
        ModalService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileModalComponent);
    component = fixture.componentInstance;
  });
});

