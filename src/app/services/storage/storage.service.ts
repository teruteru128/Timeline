import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor() { }

  fetch(key: string): any {
    const data = localStorage.getItem(key);
    const j = JSON.parse(data);
    return j;
  }

  store(key: string, items: string) {
    localStorage.setItem(key, items);
  }

  delete(key: string) {
    localStorage.removeItem(key);
  }

}
