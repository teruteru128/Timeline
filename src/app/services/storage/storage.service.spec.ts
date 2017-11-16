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
});
