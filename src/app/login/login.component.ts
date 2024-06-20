import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginData = {
    username: '',
    password: ''
  };

  constructor(
    private snack: MatSnackBar,
    private loginService: AuthService,
    private router: Router,
    public translate: TranslateService
  ) {
    this.translate.use(window.navigator.language);
  }

  hide = true;

  ngOnInit(): void {
    localStorage.removeItem('user');
  }

  formSubmit() {
    console.log(this.loginData);
    if (this.loginData.username.trim() == '' || this.loginData.username == null) {
      Swal.fire({
        title: this.translate.instant('LOGIN.USER_REQUIRED'),
        text: this.translate.instant('LOGIN.USER_REQUIRED_TEXT'),
        icon: 'warning',
        confirmButtonText: this.translate.instant('LOGIN.OK'),
        confirmButtonColor: '#2d336b'
      });
      return;
    }
    if (this.loginData.password.trim() == '' || this.loginData.password == null) {
      Swal.fire({
        title: this.translate.instant('LOGIN.PASSWORD_REQUIRED'),
        text: this.translate.instant('LOGIN.PASSWORD_REQUIRED_TEXT'),
        icon: 'warning',
        confirmButtonText: this.translate.instant('LOGIN.OK'),
        confirmButtonColor: '#2d336b'
      });
      return;
    }

    this.loginService.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log('Token obtenido:' + data.token);

        this.loginService.getCurrentUser(this.loginData.username).subscribe((user: any) => {
          console.log("USUARIOOO final: " + user);
          //this.loginService.setUser(user);
          this.loginService.loginUser(data.token);
          this.loginService.printUserData();  // Llamar a la función para imprimir los datos del usuario
          if (this.loginService.getUserRole() == 'ADMIN') {
            window.location.href = 'http://localhost:8081/user';
            this.loginService.loginStatusSubject.next(true);
          } else if (this.loginService.getUserRole() == 'USER') {
            this.router.navigate(['home']);
            this.loginService.loginStatusSubject.next(true);
            window.location.href = '/#';
          } else {
            this.loginService.logout();
            Swal.fire({
              title: this.translate.instant('LOGIN.PERMISSION_DENIED'),
              text: this.translate.instant('LOGIN.PERMISSION_DENIED_TEXT'),
              icon: 'warning',
              confirmButtonText: this.translate.instant('LOGIN.ACCEPT'),
              confirmButtonColor: '#2d336b'
            });
            return;
          }
        });
      },
      (error) => {
        Swal.fire({
          title: this.translate.instant('LOGIN.ERROR'),
          text: this.translate.instant('LOGIN.INVALID_CREDENTIALS'),
          icon: 'error',
          confirmButtonText: this.translate.instant('LOGIN.OK'),
          confirmButtonColor: '#2d336b'
        });
      }
    );
  }
}
