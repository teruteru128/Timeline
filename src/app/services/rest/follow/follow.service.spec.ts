import { TestBed, inject } from '@angular/core/testing';

import { FollowService } from './follow.service';
import { APP_CONFIG, APP_TEST_DI_CONFIG } from '../../../app.config';
import { StorageService } from '../../storage/storage.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsersResponse, User, LoginCallback } from '../models';

describe('FollowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: APP_CONFIG, useValue: APP_TEST_DI_CONFIG },
        FollowService,
        { provide: StorageService, useClass: StorageServiceMock }
      ]
    });

    it('should be created', inject([FollowService], (service: FollowService) => {
      expect(service).toBeTruthy();
    }));

    describe('PUT /1.0/follow/USER_NAME', () => {
      it('Follow user',
        inject([FollowService, HttpTestingController],
          (service: FollowService, httpMock: HttpTestingController) => {
            const okMsg = 'followed';
            const mockUser = 'kotten';
            const mockResponse = { message: okMsg };
            service.follow(mockUser)
              .subscribe(resp => {
                expect(resp['message']).toBe(okMsg);
              }, err => {
                expect(err).toBeUndefined();
              });

            const req = httpMock.expectOne('/1.0/follow/' + mockUser);

            req.flush(mockResponse);

            httpMock.verify();
          }));
    });
    it('Unfollow user',
      inject([FollowService, HttpTestingController],
        (service: FollowService, httpMock: HttpTestingController) => {
          const okMsg = 'followed';
          const mockUser = 'kotten';
          const mockResponse = { message: okMsg };
          service.unfollow(mockUser)
            .subscribe(resp => {
              expect(resp['message']).toBe(okMsg);
            }, err => {
              expect(err).toBeUndefined();
            });

          const req = httpMock.expectOne('/1.0/unfollow/' + mockUser);
          expect(req.request.method).toEqual('PUT');

          req.flush(mockResponse);

          httpMock.verify();
        }));
  });
  it('Following user',
    inject([FollowService, HttpTestingController],
      (service: FollowService, httpMock: HttpTestingController) => {
        const validUser: User = {
          id: '',
          userId: '',
          displayName: 'kitten',
          postsCount: 0,
          location: '',
          following: [],
          followers: [],
          websiteUrl: '',
          avatarUrl: '',
          official: false

        };
        const okResp: UsersResponse = { users: [validUser] };

        const mockUser = 'kitten';
        service.checkFollowing(mockUser)
          .subscribe(resp => {
            expect(resp).toBe(true);
          }, err => {
            expect(err).toBeUndefined();
          });

        const req = httpMock.expectOne('/1.0/following/' + mockUser + '?token=TOKEN');
        expect(req.request.method).toEqual('GET');

        req.flush(okResp);

        httpMock.verify();
      }));
  it('follower',
    inject([FollowService, HttpTestingController],
      (service: FollowService, httpMock: HttpTestingController) => {
        const validUser: User = {
          id: '0',
          userId: '',
          displayName: 'kitten',
          postsCount: 0,
          location: '',
          following: [],
          followers: [],
          websiteUrl: '',
          avatarUrl: '',
          official: false

        };
        const okResp: UsersResponse = { users: [validUser] };

        const mockUser = 'kitten';
        service.checFollowup(mockUser)
          .subscribe(resp => {
            expect(resp).toBe(true);
          }, err => {
            expect(err).toBeUndefined();
          });

        const req = httpMock.expectOne('/1.0/follower/' + mockUser + '?token=TOKEN');
        expect(req.request.method).toEqual('GET');

        req.flush(okResp);

        httpMock.verify();
      }));
});

class StorageServiceMock extends StorageService {
  dummyResp: LoginCallback = {
    id: '0',
    userId: 'kitten',
    createdDate: new Date(),
    updatedDate: new Date(),
    sessionToken: 'TOKEN'
  };

  fetch(user: string): any {
    const dummyJson = JSON.stringify(this.dummyResp);
    return JSON.parse(dummyJson);
  }
}
