import { TestBed, inject } from '@angular/core/testing';

import { FollowService } from './follow.service';
import { APP_CONFIG, APP_TEST_DI_CONFIG } from '../../../app.config';
import { StorageService } from '../../storage/storage.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User, LoginCallback } from '../models';

describe('FollowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: APP_CONFIG, useValue: APP_TEST_DI_CONFIG },
        FollowService,
        StorageService
    ]
    });

    it('should be created', inject([FollowService], (service: FollowService) => {
      expect(service).toBeTruthy();
    }));
  });
});

