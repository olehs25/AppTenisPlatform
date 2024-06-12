import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InactivityService {
  private timeoutInMs: number = 10 * 60 * 1000; // 10 minutos
  private timeoutId: any;

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private authService: AuthService
  ) {
    this.initListener();
    this.initTimeout();
  }

  private initListener() {
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('mousemove', () => this.resetTimeout());
      window.addEventListener('keydown', () => this.resetTimeout());
    });
  }

  private initTimeout() {
    this.ngZone.runOutsideAngular(() => {
      this.timeoutId = setTimeout(() => this.logout(), this.timeoutInMs);
    });
  }

  private resetTimeout() {
    clearTimeout(this.timeoutId);
    this.initTimeout();
  }

  private logout() {
    this.ngZone.run(() => {
      this.authService.logout();
      this.router.navigate(['login']);
    });
  }
}
