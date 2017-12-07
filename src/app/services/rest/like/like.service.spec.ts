import { TestBed, inject } from '@angular/core/testing';

import { LikeService } from './like.service';
import { StorageService } from '../../storage/storage.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LikeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        LikeService,
        StorageService
      ]
    });
  });

  it('should be created', inject([LikeService], (service: LikeService) => {
    expect(service).toBeTruthy();
  }));
});
