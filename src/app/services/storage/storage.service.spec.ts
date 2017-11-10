import { TestBed, inject } from '@angular/core/testing';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  const STORAGE_KEY = 'token';
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

  it('fetch(STORAGE_KEY)', inject([StorageService], (service: StorageService) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(STORAGE_VALUE));
    expect(service.fetch(STORAGE_KEY)).toBe(STORAGE_VALUE);
  }));

  it('store(STORAGE_KEY, STORAGE_VALUE)', inject([StorageService], (service: StorageService) => {
    service.store(STORAGE_KEY, STORAGE_VALUE);
    expect(service.fetch(STORAGE_KEY)).toBe(STORAGE_VALUE);
  }));

  it('clear(STORAGE_KEY)', inject([StorageService], (service: StorageService) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(STORAGE_VALUE));
    service.clear(STORAGE_KEY);
    const after = localStorage.getItem(STORAGE_KEY);
    expect(after).toBe(null);
  }));

  it('add(STORAGE_KEY, STORAGE_VALUE)', inject([StorageService], (service: StorageService) => {
    const dataArray = ['foo', 'bar', 'baz'];

    // Same key, another values
    dataArray.map(data => {
      service.add(STORAGE_KEY, data); // [foo, bar, baz]
    });

    let after = localStorage.getItem(STORAGE_KEY); // [foo, bar, baz]
    expect(after).toBe(JSON.stringify(dataArray));

    // Another key, same values
    dataArray.map(key => {
      service.add(key, STORAGE_VALUE);
    });

    dataArray.map(key => {
      after = localStorage.getItem(key);
      expect(after).toBe(JSON.stringify([STORAGE_VALUE]));
    });
 }));

 it('delete(STORAGE_KEY, STORAGE_VALUE)', inject([StorageService], (service: StorageService) => {
    const dataArray = ['foo', 'bar', 'baz'];
    dataArray.map(data => {
      service.add(STORAGE_KEY, data); // [foo, bar, baz]
    });

    service.delete(STORAGE_KEY, dataArray[0]); // [bar, baz]
    const after = localStorage.getItem(STORAGE_KEY);

    expect(after).toBe(JSON.stringify(['bar', 'baz']));
 }));

});
