import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor() { }

  fetch(key: string): Object[] {
    const data = localStorage.getItem(key);
    const j = JSON.parse(data);
    return JSON.parse(j) || [];
  }

  store(key: string, items: string[]) {
    localStorage.setItem(key, JSON.stringify(items));
  }

  clear(key: string) {
    localStorage.removeItem(key);
  }

  add(key: string, item: string) {
    const items = this.fetch(key).concat(item);
    localStorage.setItem(key, JSON.stringify(items));
  }

  delete(key: string, item: string) {
    const items = this.fetch(key);
    const filtered = items.filter(_item => {
      return _item !== item;
    });

    localStorage.setItem(key, JSON.stringify(filtered));
  }

}
