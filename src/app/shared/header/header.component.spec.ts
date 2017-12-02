import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/rest/user/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APP_CONFIG, APP_DI_CONFIG } from '../../app.config';
import { StorageService } from '../../services/storage/storage.service';
import { FollowService } from '../../services/rest/follow/follow.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ HeaderComponent ],
      providers: [
        { provide: APP_CONFIG, useValue: APP_DI_CONFIG },
        UserService,
        StorageService,
        FollowService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
