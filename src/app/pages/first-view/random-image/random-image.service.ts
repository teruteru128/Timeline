import { Injectable } from '@angular/core';

@Injectable()
export class RandomImageService {

  constructor() {
  }

  getRandomImage(pathArray: string[]): string {
   const rand = Math.floor( Math.random() * pathArray.length);
   return pathArray[rand];
  }

}
