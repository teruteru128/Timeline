import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { StorageService } from '../../storage/storage.service';
import { User, LoginCallback, ErrorResponse, MessageResponse } from '../models';
import { APP_CONFIG, APP_TEST_DI_CONFIG } from '../../../app.config';

const mockErrorResponse: ErrorResponse = {
  error: 'error'
};

const mockCreatedResponse: MessageResponse = {
  message: 'created'
};

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {provide: APP_CONFIG, useValue: APP_TEST_DI_CONFIG},
        UserService,
        StorageService
      ]
    });
  });

  it('should be created',
  inject([UserService],
    (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  describe('GET /v1/user/kitten', () => {
  it('Get user by UserName',
    inject([UserService, HttpTestingController],
      (service: UserService, httpMock: HttpTestingController) => {
        const mockResponse: User = {
          id: 'unique_id',
          userId: 'kitten',
          displayName: 'Kitten',
          postsCount: 1,
          location: 'Gunma Empire',
          followingCount: 2,
          followersCount: 3,
          websiteUrl: 'https://example.com',
          avatarUrl: 'https://static.example.com/kitten.png',
          official: false
      };
      service.getUserById('kitten').subscribe((resp: User) => {
        expect(resp.id).toBe('unique_id');
        expect(resp.userId).toBe('kitten');
        expect(resp.displayName).toBe('Kitten');
        expect(resp.postsCount).toBe(1);
        expect(resp.location).toBe('Gunma Empire');
        expect(resp.followingCount).toBe(2);
        expect(resp.followersCount).toBe(3);
        expect(resp.websiteUrl).toBe('https://example.com');
        expect(resp.avatarUrl).toBe('https://static.example.com/kitten.png');
      }, err => {
        expect(err).toBeUndefined();
      });

      const req = httpMock.expectOne('/v1/users/kitten');
      expect(req.request.method).toEqual('GET');

      req.flush(mockResponse);

      httpMock.verify();
    }));

    it('Get user by NOT registered UserName',
    inject([UserService, HttpTestingController],
      (service: UserService, httpMock: HttpTestingController) => {
      service.getUserById('kotten').subscribe(resp => {
        expect(resp).toBeUndefined();
      }, err => {
        expect(err['error']).toBe('error');
      });

      const req = httpMock.expectOne('/v1/users/kotten');
      expect(req.request.method).toEqual('GET');

      req.flush(mockErrorResponse, {status: 404, statusText: 'NOT FOUND'});

      httpMock.verify();
    }));
  });

  describe('POST /v1/login', () => {
    const nowDate = new Date();
    // tslint:disable-next-line:max-line-length
    const jwtToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJUaW55S2l0dGVuIFRpbWVsaW5lIiwic3ViIjoia2l0dGVuIiwiYXVkIjoid2ViIiwiaWF0IjoxNTA5Njc5NzY3LCJleHAiOjE1MDk5Mzg5Njd9.bKb5yMJfukjWY17-nghPQDCaMkz1da7oivQMgA3wUBTN6tXKggetnR_-ZUKasWbySC8_WtxepPUsshUXUhgCVx3ud_V8qyDnCvG8MZBKUlOB6dRN7CfdhctwBLBTplzi6fUgn_2LiWWgK9Q-n8urhC36POhHzDyDPJXDyKm10e_9xpFwkYnezQ0tPGv72YSa34_6e5ZNylsNy6gw8mC5ZAqWh9f1ufyWRWOBd2i927J6x4cBjCU5lunyDz1Tr90wgMCkuDQ-CxZoCKc9z4U0cZmJ3GUebkuTgWI0v8UrNXOOUi8XRynxpd9xRgNdL-p7xWoyTZzb9AA-XnKJoIWmG63rX8n_SiL7crMGYrHR0WAXsQr9_kKXJj08nliP5RK1sSe-Qr2mDRJwbSNpudGvHCDJUZ8PlQkTO2OVhkfmHViwk3KZDeUEBRnLqyafXiWZlr4gs2Vcc2ez19Vd8tBBXDkRcFf6PLrAQIHYFPWSLZ8eOo3NXbYs2R1nhylhKr0Y0fTkK5q6Shq7n3RjxNuAdH6JjbytH1i5_OJ263VjDoKazcPG94xVfi6yCJdKvDhH-PWsZ1rGUzL-UOAMJw3hKg2ir8rY8A99W2d9NUaBnTzBWEwK0TbZccKK7WCAD4aepm44-S16t82baLQN3fW5FD5fowusdFOA5_tFp5iGHkY';
    const mockResponse: LoginCallback = {
      id: 'unique_id',
      userId: 'kitten',
      createdDate: nowDate,
      updatedDate: nowDate,
      sessionToken: jwtToken
    };

    it('Login',
    inject([UserService, HttpTestingController],
      (service: UserService, httpMock: HttpTestingController) => {
      service.login('kitten', 'password').subscribe((resp: LoginCallback) => {
        expect(resp.id).toBe('unique_id');
        expect(resp.userId).toBe('kitten');
        expect(resp.createdDate).toBe(nowDate);
        expect(resp.updatedDate).toBe(nowDate);
        expect(resp.sessionToken).toBe(jwtToken);
      }, err => {
        expect(err).toBeUndefined();
      });

      const req = httpMock.expectOne('/v1/login');
      expect(req.request.method).toEqual('POST');

      req.flush(mockResponse);

      httpMock.verify();
    }));

    it('Login should failed',
    inject([UserService, HttpTestingController],
      (service: UserService, httpMock: HttpTestingController) => {
        service.login('bad', 'user').subscribe(resp => {
          expect(resp).toBeUndefined();
        }, err => {
          expect(err['error']).toBe('error');
        });

        const req = httpMock.expectOne('/v1/login');
        expect(req.request.method).toEqual('POST');

        req.flush(mockErrorResponse, {status: 409, statusText: 'CONFLICT'});

        httpMock.verify();
      }));
  });

  it('Signup should success',
  inject([UserService, HttpTestingController],
    (service: UserService, httpMock: HttpTestingController) => {
      service.signup('hello', 'hello@example.com', 'password').subscribe(resp => {
        expect(resp['message']).toBe('created');
      }, err => {
        expect(err).toBeUndefined();
      });

      const req = httpMock.expectOne('/v1/signup');
      expect(req.request.method).toEqual('POST');

      req.flush(mockCreatedResponse, {status: 201, statusText: 'CREATED'});

      httpMock.verify();
    }));

    it('Signup should failed',
    inject([UserService, HttpTestingController],
      (service: UserService, httpMock: HttpTestingController) => {
        service.signup('bad', 'notavailable', 'password').subscribe(resp => {
          expect(resp).toBeUndefined();
        }, err => {
          expect(err['error']).toBe('error');
        });

        const req = httpMock.expectOne('/v1/signup');
        expect(req.request.method).toEqual('POST');

        req.flush(mockErrorResponse, {status: 500, statusText: 'INTERNAL SERVER ERROR'});

        httpMock.verify();
      }));

      it('Signup should conflict',
      inject([UserService, HttpTestingController],
        (service: UserService, httpMock: HttpTestingController) => {
          service.signup('dup', 'dup@example.com', 'password').subscribe(resp => {
            expect(resp).toBeUndefined();
          }, err => {
            expect(err['error']).toBe('error');
          });

          const req = httpMock.expectOne('/v1/signup');
          expect(req.request.method).toEqual('POST');

          req.flush(mockErrorResponse, {status: 409, statusText: 'CONFLICT'});

          httpMock.verify();
        }));
});
