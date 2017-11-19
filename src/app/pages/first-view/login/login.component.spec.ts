import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RandomImageService } from '../random-image/random-image.service';
import { StorageService } from '../../../services/storage/storage.service';
import { UserService } from '../../../services/rest/user/user.service';
import { APP_DI_CONFIG, APP_CONFIG } from '../../../app.config';
import { Observable } from 'rxjs/Observable';
import { LoginCallback } from '../../../services/rest/models';
import { Router } from '@angular/router';

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
        {provide: UserService, useClass: UserServiceMock},
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

  it('onSubmit', () => {
    component.onSubmit();
    expect(component.formErr).toBe(false);
  });

  class UserServiceMock extends UserService {
    login(id: string, password: string): Observable<LoginCallback> {
      const callback: LoginCallback = {
        id: '',
        userId: '',
        createdDate: new Date(),
        updatedDate: new Date(),
        sessionToken: ''
      };
      return new Observable<LoginCallback>(observer => {
        observer.next(callback);
      });
    }
  }
});

describe('LoginComponent Error', () => {
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
        {provide: UserService, useClass: UserServiceMock},
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

  it('onSubmit', () => {
    component.onSubmit();
    expect(component.formErr).toBe(true);
    expect(component.form.id).toBe('');
    expect(component.form.password).toBe('');
  });

  class UserServiceMock extends UserService {
    login(id: string, password: string): Observable<LoginCallback> {
      return new Observable<LoginCallback>(observer => {
        observer.error();
      });
    }
  }
});
