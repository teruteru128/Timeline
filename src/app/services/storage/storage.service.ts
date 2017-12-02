import {Inject, Injectable} from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {APP_CONFIG, AppConfig} from '../../app.config';

@Injectable()
export class StorageService {

  constructor(@Inject(APP_CONFIG) private config: AppConfig) { }

  fetch(key: string): any {
    const data = localStorage.getItem(key);
    if (data !== null) {
      const bytes  = CryptoJS.AES.decrypt(data.toString(), this.config.localStorageToken);
      const j = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return j;
    }

    return null;
  }

  store(key: string, item: any) {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(item), this.config.localStorageToken);
    localStorage.setItem(key, encrypted.toString());
  }

  delete(key: string) {
    localStorage.removeItem(key);
  }

}
