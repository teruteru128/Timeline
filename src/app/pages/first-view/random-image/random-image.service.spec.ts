import { TestBed, inject } from '@angular/core/testing';

import { RandomImageService } from './random-image.service';
import { ElementRef } from '@angular/core';

export class MockElementRef extends ElementRef {
  constructor() { super(null); }
}

describe('RandomImageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RandomImageService,
        { provide: ElementRef, useClass: MockElementRef }
      ]
    });
  });

  it('should be created', inject([RandomImageService], (service: RandomImageService) => {
    expect(service).toBeTruthy();
  }));

  it('Random image', inject([RandomImageService], (service: RandomImageService) => {
    for (let i = 0; i < 10; i++) {
      const images = [
        '/assets/bgimgs/1.jpg',
        '/assets/bgimgs/2.jpg',
        '/assets/bgimgs/3.jpg'
      ];
      const img = service.getRandomImage(images);
      expect(img).toBeDefined();
    }
  }));

});
