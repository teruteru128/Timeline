import { Injectable } from '@angular/core';

@Injectable()
export class DateService {

  constructor() { }

  formatDate(_date: Date): string {
    const date = new Date(_date);
    const diff = new Date().getTime() - date.getTime();
    const d = new Date(diff);

    const uy = date.getUTCFullYear();
    const umo = date.getUTCMonth();
    const ud = date.getUTCDay();
    const uh = date.getUTCHours();
    const umi = date.getUTCMinutes();
    const us = date.getUTCSeconds();

    const umiStr = this.zeroPadding(parseInt(umi.toString(), 10));
    const usStr = this.zeroPadding(parseInt(us.toString(), 10));

    if (d.getUTCFullYear() - 1970) {
      return `${uy}/${umo}/${ud} ${uh}:${umiStr}:${usStr}`;
    } else if (d.getUTCDate() - 1) {
      return `${umo}/${ud} ${uh}:${umiStr}:${usStr}`;
    } else if (d.getUTCHours()) {
      return d.getUTCHours() + '時間前';
    } else if (d.getUTCMinutes()) {
      return d.getUTCMinutes() + '分前';
    } else {
      return d.getUTCSeconds() + '秒前';
    }
  }

  zeroPadding(num: number): string {
    if (num < 10) {
      return '0' + num.toString();
    }
    return num.toString();
  }

}
