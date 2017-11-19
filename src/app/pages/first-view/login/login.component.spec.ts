import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RandomImageService } from '../random-image/random-image.service';
import { StorageService } from '../../../services/storage/storage.service';
import { UserService } from '../../../services/rest/user/user.service';
import { APP_DI_CONFIG, APP_CONFIG } from '../../../app.config';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ LoginComponent ],
      providers: [
        {provide: APP_CONFIG, useValue: APP_DI_CONFIG},
        UserService,
        StorageService,
        RandomImageService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
