import { TestBed, inject } from '@angular/core/testing';

import { SocketIOService } from './socket-io.service';
import { APP_CONFIG, APP_DI_CONFIG } from '../../app.config';

describe('SocketIOService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: APP_CONFIG, useValue: APP_DI_CONFIG},
        SocketIOService
      ]
    });
  });

  it('should be created', inject([SocketIOService], (service: SocketIOService) => {
    expect(service).toBeTruthy();
  }));
});
