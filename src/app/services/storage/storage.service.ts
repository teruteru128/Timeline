import {Inject, Injectable} from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environments/environment';

@Injectable()
export class StorageService {

  fetch(key: string): any {
    const data = localStorage.getItem(key);
    if (data !== null) {
      const bytes  = CryptoJS.AES.decrypt(data.toString(), environment.localStorageToken);
      const j = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return j;
    }

    return null;
  }

  store(key: string, item: any) {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(item), environment.localStorageToken);
    localStorage.setItem(key, encrypted.toString());
  }

  delete(key: string) {
    localStorage.removeItem(key);
  }

}
