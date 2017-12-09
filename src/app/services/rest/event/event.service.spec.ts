import { TestBed, inject } from '@angular/core/testing';

import { EventService } from './event.service';
import { StorageService } from '../../storage/storage.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        EventService,
        StorageService
      ]
    });
  });

  it('should be created', inject([EventService], (service: EventService) => {
    expect(service).toBeTruthy();
  }));
});
