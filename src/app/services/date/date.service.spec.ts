import { TestBed, inject } from '@angular/core/testing';

import { DateService } from './date.service';

describe('DateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateService]
    });
  });

  it('should be created', inject([DateService], (service: DateService) => {
    expect(service).toBeTruthy();
  }));

  it('zero padding', inject([DateService], (service: DateService) => {
    const num0 = 1;
    const num1 = 10;

    const one = service.zeroPadding(num0);
    const noop = service.zeroPadding(num1);

    expect(one).toBe('01');
    expect(noop).toBe('10');
  }));
});
