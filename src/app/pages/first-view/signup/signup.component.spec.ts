import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RandomImageService } from '../random-image/random-image.service';
import { UserService } from '../../../services/rest/user/user.service';
import { StorageService } from '../../../services/storage/storage.service';
import { MessageResponse } from '../../../services/rest/models';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { HttpClient } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule
      ],
      declarations: [ SignupComponent ],
      providers: [
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
  let httpClient: HttpClient;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule
      ],
      declarations: [ SignupComponent ],
      providers: [
        {provide: UserService, useClass: UserServiceMock},
        StorageService,
        RandomImageService
      ]
    })
    .compileComponents();
    httpClient = TestBed.get(HttpClient);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('onSubmit', () => {
    httpClient.get('/account/signup.json').subscribe(null, (_: HttpErrorResponse) => {
      component.onSubmit();
      expect(component.form.id).toBe('');
      expect(component.form.mail).toBe('');
      expect(component.form.password).toBe('');
    });
  });

  class UserServiceMock extends UserService {
    signup(userId: string, email: string, password: string): Observable<HttpErrorResponse> {
      return new Observable<HttpErrorResponse>(observer => {
        observer.error();
      });
    }
  }
});
