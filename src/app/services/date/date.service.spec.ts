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

  it('format date', inject([DateService], (service: DateService) => {
    const timerCallback = jasmine.createSpy('timerCallback');
    jasmine.clock().install();

    const base = new Date('2017/01/02');
    const yr = new Date('2016/01/01 00:00:00');
    const hr = new Date('2017/01/01 23:00:00');
    const min = new Date('2017/01/01 23:59:00');
    const sec = new Date('2017/01/01 23:59:30');

    jasmine.clock().mockDate(base);
    expect(timerCallback).not.toHaveBeenCalled();

    expect(service.formatDate(yr)).toBe('2016/1/1 0:00:00');
    expect(service.formatDate(hr)).toBe('1時間前');
    expect(service.formatDate(min)).toBe('1分前');
    expect(service.formatDate(sec)).toBe('30秒前');
  }));

  afterEach(() => {
    jasmine.clock().uninstall();
  });

});
