import { TestBed, inject } from '@angular/core/testing';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  const STORAGE_KEY = 'sessionToken';
  const STORAGE_VALUE = 'hoge';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService]
    });

    let store = {};

    spyOn(window.localStorage, 'getItem').and.callFake((key: string) => {
      return store[key] || null;
    });

    spyOn(localStorage, 'removeItem').and.callFake((key: string) => {
      delete store[key];
    });

    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string): string => {
      return store[key] = <string>value;
    });

    spyOn(localStorage, 'clear').and.callFake(() => {
      store = {};
    });
  });

  it('should be created', inject([StorageService], (service: StorageService) => {
    expect(service).toBeTruthy();
  }));

  it('fetch', inject([StorageService], (service: StorageService) => {
    const v = {'key': 'value'};
    const sv = JSON.stringify(v);
    localStorage.setItem('key', sv);
    const r = service.fetch('key');
    expect(JSON.stringify(r)).toBe(sv);
  }));

  it('fetch', inject([StorageService], (service: StorageService) => {
    const v = {'key': 'value'};
    const sv = JSON.stringify(v);
    localStorage.setItem('key', sv);
    service.delete('key');
    const r = localStorage.getItem('key');
    expect(r).toBe(null);
  }));
});
