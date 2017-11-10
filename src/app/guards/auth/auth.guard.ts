import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { StorageService } from '../../services/storage/storage.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private storageService: StorageService,
    private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLogin(state.url);
  }

  checkLogin(url: string): boolean {
    const user = this.storageService.fetch('user');

    if (url === '/login' || url === '/signup') {
      if (user.length === 0) { return true; }

      this.router.navigate(['']);
      return false;
    }

    if (user.length !== 0) { return true; }

    this.router.navigate(['/login']);
    return false;
  }
}
