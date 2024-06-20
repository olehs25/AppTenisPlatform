import { Component, inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, shareReplay } from 'rxjs/operators';
import Swal from "sweetalert2";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-tenisbar',
  templateUrl: './tenisbar.component.html',
  styleUrls: ['./tenisbar.component.scss']
})
export class TenisbarComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  fullName?: string;
  isAdmin: boolean = false;

  constructor(public loginService: AuthService, public translate: TranslateService) {
    this.translate.use(window.navigator.language);
  }

  ngOnInit(): void {
    this.checkIfAdmin();
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  public logout() {
    Swal.fire({
      title: this.translate.instant('TENISBAR.LOGOUT_TITLE'),
      text: this.translate.instant('TENISBAR.LOGOUT_TEXT'),
      icon: "question",
      confirmButtonText: this.translate.instant('TENISBAR.LOGOUT_CONFIRM'),
      confirmButtonColor: '#2d336b',
      showCancelButton: true,
      cancelButtonText: this.translate.instant('TENISBAR.LOGOUT_CANCEL'),
      cancelButtonColor: '#833c3c'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loginService.logout();
        Swal.fire({
          title: this.translate.instant('TENISBAR.LOGOUT_SUCCESS'),
          icon: 'success',
          confirmButtonColor: '#2d336b'
        });
        window.location.href = '/#';
      }
    });
    this.isAdmin = false;
  }

  public getUserFullName() {
    this.fullName = this.loginService.getUserFullName();
    return this.fullName;
  }

  checkIfAdmin() {
    const userRole = this.loginService.getUserRole();
    if (this.loginService.isLoggedIn() && userRole === 'ADMIN') {
      console.log("ROLLLLLLLLLL: " + userRole);
      this.isAdmin = true;
    }
  }
}
