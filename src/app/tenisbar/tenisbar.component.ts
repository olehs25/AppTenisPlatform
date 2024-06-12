import {Component, inject, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, shareReplay } from 'rxjs/operators';
import Swal from "sweetalert2";
import {userDTO} from "../models/userDTO";

@Component({
  selector: 'app-tenisbar',
  templateUrl: './tenisbar.component.html',
  styleUrls: ['./tenisbar.component.scss']
})
export class TenisbarComponent implements OnInit{
  private breakpointObserver = inject(BreakpointObserver);
  fullName?:string;
  isAdmin: boolean = false;
  constructor(public loginService: AuthService) {}
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
      title: '¿Quieres cerrar sesión?',
      text: 'Se cerrará la sesión actual',
      icon: "question",
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#2d336b',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#833c3c'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loginService.logout();
        window.location.href='/#';
      }
    });
  }

  public getUserFullName(){
    this.fullName = this.loginService.getUserFullName()
    return this.fullName
  }

  checkIfAdmin() {
    const userRole = this.loginService.getUserRole();
    if (this.loginService.isLoggedIn() && userRole === 'ADMIN') {
      console.log("ROLLLLLLLLLL: "+userRole)
      this.isAdmin = true;
    }
  }
}
