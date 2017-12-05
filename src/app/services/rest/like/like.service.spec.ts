import { TestBed, inject } from '@angular/core/testing';

import { LikeService } from './like.service';
import { StorageService } from '../../storage/storage.service';
import { APP_CONFIG, APP_DI_CONFIG } from '../../../app.config';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LikeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        LikeService,
        StorageService,
        { provide: APP_CONFIG, useValue: APP_DI_CONFIG }
      ]
    });
  });

  it('should be created', inject([LikeService], (service: LikeService) => {
    expect(service).toBeTruthy();
  }));
});
