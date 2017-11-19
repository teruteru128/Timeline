import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RandomImageService } from '../random-image/random-image.service';
import { UserService } from '../../../services/rest/user/user.service';
import { APP_CONFIG, APP_DI_CONFIG } from '../../../app.config';
import { StorageService } from '../../../services/storage/storage.service';
import { MessageResponse } from '../../../services/rest/models';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ SignupComponent ],
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
    fixture = TestBed.createComponent(SignupComponent);
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
    signup(userId: string, email: string, password: string): Observable<MessageResponse> {
      const callback: MessageResponse = {
        message: ''
      };
      return new Observable<MessageResponse>(observer => {
        observer.next(callback);
      });
    }
  }
});

describe('SignupComponent Error', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ SignupComponent ],
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
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('onSubmit', () => {
    component.onSubmit();
    expect(component.form.id).toBe('');
    expect(component.form.mail).toBe('');
    expect(component.form.password).toBe('');
  });

  class UserServiceMock extends UserService {
    signup(userId: string, email: string, password: string): Observable<MessageResponse> {
      return new Observable<MessageResponse>(observer => {
        observer.error();
      });
    }
  }
});
