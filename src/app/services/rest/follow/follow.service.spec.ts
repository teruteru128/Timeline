import { TestBed, inject } from '@angular/core/testing';

import { FollowService } from './follow.service';
import { APP_CONFIG, APP_TEST_DI_CONFIG } from '../../../app.config';
import { StorageService } from '../../storage/storage.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('FollowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {provide: APP_CONFIG, useValue: APP_TEST_DI_CONFIG},
        FollowService,
        StorageService
      ]
    });
  });

  it('should be created', inject([FollowService], (service: FollowService) => {
    expect(service).toBeTruthy();
  }));

  describe('PUT /v1/follow/USER_NAME', () => {
    it('Follow user',
    inject([FollowService, HttpTestingController],
      (service: FollowService, httpMock: HttpTestingController) => {
        const okMsg = 'followed';
        const mockUser = 'kotten';
        const mockResponse = {message: okMsg};
        service.follow(mockUser)
          .subscribe(resp => {
            expect(resp['message']).toBe(okMsg);
          }, err => {
            expect(err).toBeUndefined();
          });

          const req = httpMock.expectOne('/v1/follow/' + mockUser);
          expect(req.request.method).toEqual('PUT');

          req.flush(mockResponse);

          httpMock.verify();
      }));
  });

  describe('PUT /v1/unfollow/USER_NAME', () => {
    it('Unfollow user',
    inject([FollowService, HttpTestingController],
      (service: FollowService, httpMock: HttpTestingController) => {
        const okMsg = 'followed';
        const mockUser = 'kotten';
        const mockResponse = {message: okMsg};
        service.unfollow(mockUser)
          .subscribe(resp => {
            expect(resp['message']).toBe(okMsg);
          }, err => {
            expect(err).toBeUndefined();
          });

          const req = httpMock.expectOne('/v1/unfollow/' + mockUser);
          expect(req.request.method).toEqual('PUT');

          req.flush(mockResponse);

          httpMock.verify();
      }));
  });
});
