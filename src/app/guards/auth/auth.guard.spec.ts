import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { StorageService } from '../../services/storage/storage.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('AuthGuard Not Logged in', () => {
  const router = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        AuthGuard,
        {provide: Router, useValue: router},
        {provide: StorageService, useClass: StorageServiceMock}
      ]
    });
  });
  class StorageServiceMock extends StorageService {
    fetch(user: string): Object[] {
      return null;
    }
  }

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
  it('root', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard.checkLogin('/')).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  }));
  it('login || signup', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard.checkLogin('/login')).toBe(true);
    expect(guard.checkLogin('/signup')).toBe(true);
  }));
});

describe('AuthGuard Already Logged in', () => {
  const router = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        AuthGuard,
        {provide: Router, useValue: router},
        {provide: StorageService, useClass: StorageServiceMock}
      ]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
  it('root', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard.checkLogin('/')).toBe(true);
  }));
  it('login || signup', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard.checkLogin('/login')).toBe(false);
    expect(guard.checkLogin('/signup')).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  }));
  class StorageServiceMock extends StorageService {
    fetch(user: string): Object[] {
      const dummyJson = JSON.stringify({sessionToken: 'sessionToken'});
      return JSON.parse(dummyJson);
    }
  }
});

