import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { StorageService } from '../../storage/storage.service';
import { User, LoginCallback } from '../models';
import { APP_CONFIG, APP_TEST_DI_CONFIG } from '../../../app.config';

const mockErrorResponse = {
  error: 'error'
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
    const mockResponse: User = {
      permanent_id: 0,
      id: 'kitten',
      name: 'Kitten',
      posts_count: 0,
      location: 'Gunma Empire',
      followees_count: 0,
      followers_count: 0,
      website_url: '',
      profile_image_url: ''
  };

  it('Get user by UserName',
    inject([UserService, HttpTestingController],
      (service: UserService, httpMock: HttpTestingController) => {
      service.getUserByName('kitten').subscribe((resp: User) => {
        expect(resp.permanent_id).toBe(0);
        expect(resp.id).toBe('kitten');
        expect(resp.name).toBe('Kitten');
        expect(resp.posts_count).toBe(0);
        expect(resp.location).toBe('Gunma Empire');
        expect(resp.followees_count).toBe(0);
        expect(resp.followers_count).toBe(0);
        expect(resp.website_url).toBe('');
        expect(resp.profile_image_url).toBe('');
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
      service.getUserByName('kotten').subscribe(resp => {
        expect(resp).toBeUndefined();
      }, err => {
        expect(err['error']).toBe('error');
      });

      const req = httpMock.expectOne('/v1/users/kotten');
      expect(req.request.method).toEqual('GET');

      req.flush(mockErrorResponse, {status: 404, statusText: 'NOT FOUND'});

      httpMock.verify();
    }));

    it('Get user by Permanent ID',
    inject([UserService, HttpTestingController],
      (service: UserService, httpMock: HttpTestingController) => {
      const userService = TestBed.get(UserService);

      service.getUserById(0).subscribe((resp: User) => {
        expect(resp.permanent_id).toBe(0);
        expect(resp.id).toBe('kitten');
        expect(resp.name).toBe('Kitten');
        expect(resp.posts_count).toBe(0);
        expect(resp.location).toBe('Gunma Empire');
        expect(resp.followees_count).toBe(0);
        expect(resp.followers_count).toBe(0);
        expect(resp.website_url).toBe('');
        expect(resp.profile_image_url).toBe('');
      });

      const req = httpMock.expectOne('/v1/users/0');
      expect(req.request.method).toEqual('GET');

      req.flush(mockResponse);

      httpMock.verify();
    }));

    it('Get user by NOT registered Permanent ID',
    inject([UserService, HttpTestingController],
      (service: UserService, httpMock: HttpTestingController) => {
      service.getUserById(0).subscribe(resp => {
        expect(resp).toBeUndefined();
      }, err => {
        expect(err['error']).toBe('error');
      });

      const req = httpMock.expectOne('/v1/users/0');
      expect(req.request.method).toEqual('GET');

      req.flush(mockErrorResponse, {status: 404, statusText: 'NOT FOUND'});

      httpMock.verify();
    }));
  });

  describe('POST /v1/auth', () => {
    const nowDate = new Date();
    // tslint:disable-next-line:max-line-length
    const jwtToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJUaW55S2l0dGVuIFRpbWVsaW5lIiwic3ViIjoia2l0dGVuIiwiYXVkIjoid2ViIiwiaWF0IjoxNTA5Njc5NzY3LCJleHAiOjE1MDk5Mzg5Njd9.bKb5yMJfukjWY17-nghPQDCaMkz1da7oivQMgA3wUBTN6tXKggetnR_-ZUKasWbySC8_WtxepPUsshUXUhgCVx3ud_V8qyDnCvG8MZBKUlOB6dRN7CfdhctwBLBTplzi6fUgn_2LiWWgK9Q-n8urhC36POhHzDyDPJXDyKm10e_9xpFwkYnezQ0tPGv72YSa34_6e5ZNylsNy6gw8mC5ZAqWh9f1ufyWRWOBd2i927J6x4cBjCU5lunyDz1Tr90wgMCkuDQ-CxZoCKc9z4U0cZmJ3GUebkuTgWI0v8UrNXOOUi8XRynxpd9xRgNdL-p7xWoyTZzb9AA-XnKJoIWmG63rX8n_SiL7crMGYrHR0WAXsQr9_kKXJj08nliP5RK1sSe-Qr2mDRJwbSNpudGvHCDJUZ8PlQkTO2OVhkfmHViwk3KZDeUEBRnLqyafXiWZlr4gs2Vcc2ez19Vd8tBBXDkRcFf6PLrAQIHYFPWSLZ8eOo3NXbYs2R1nhylhKr0Y0fTkK5q6Shq7n3RjxNuAdH6JjbytH1i5_OJ263VjDoKazcPG94xVfi6yCJdKvDhH-PWsZ1rGUzL-UOAMJw3hKg2ir8rY8A99W2d9NUaBnTzBWEwK0TbZccKK7WCAD4aepm44-S16t82baLQN3fW5FD5fowusdFOA5_tFp5iGHkY';
    const mockResponse: LoginCallback = {
      permanent_id: 0,
      id: 'kitten',
      mailAddress: 'kitten@example.com',
      createDate: nowDate,
      updateDate: nowDate,
      sessionToken: jwtToken
    };

    it('Login',
    inject([UserService, HttpTestingController],
      (service: UserService, httpMock: HttpTestingController) => {
      service.login('kitten', 'password').subscribe((resp: LoginCallback) => {
        expect(resp.permanent_id).toBe(0);
        expect(resp.id).toBe('kitten');
        expect(resp.mailAddress).toBe('kitten@example.com');
        expect(resp.createDate).toBe(nowDate);
        expect(resp.updateDate).toBe(nowDate);
        expect(resp.sessionToken).toBe(jwtToken);
      }, err => {
        expect(err).toBeUndefined();
      });

      const req = httpMock.expectOne('/v1/auth');
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

        const req = httpMock.expectOne('/v1/auth');
        expect(req.request.method).toEqual('POST');

        req.flush(mockErrorResponse, {status: 409, statusText: 'CONFLICT'});

        httpMock.verify();
      }));
  });

});
