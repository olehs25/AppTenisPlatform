import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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


  constructor(private snack:MatSnackBar, private loginService:AuthService, private router: Router) { }

  hide = true;
  ngOnInit(): void {
    localStorage.removeItem('user')
  }

  formSubmit() {
    console.log(this.loginData);
    if (this.loginData.username.trim() == '' || this.loginData.username == null) {
      Swal.fire({
        title: 'Usuario obligatorio',
        text: 'Debe introducir un usuario válido para poder iniciar sesión',
        icon: 'warning',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#2d336b'
      });
      return;
    }
    if (this.loginData.password.trim() == '' || this.loginData.password == null) {
      Swal.fire({
        title: 'Contraseña obligatoria',
        text: 'Debe introducir una contraseña válida para poder iniciar sesión',
        icon: 'warning',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#2d336b'
      });
      return;
    }

    this.loginService.generateToken(this.loginData).subscribe(
        (data:any)=>{
          console.log('Token obtenido:' +data.token);

          this.loginService.getCurrentUser(this.loginData.username).subscribe((user:any)=>{
            console.log("USUARIOOO final: "+user);
            this.loginService.setUser(user);
            this.loginService.loginUser(data.token);
            if(this.loginService.getUserRole()=='ADMIN'){
              window.location.href = 'http://localhost:8081/user';
              //this.router.navigate(['profile']);
              this.loginService.loginStatusSubject.next(true);
              // window.location.reload();
              //window.location.href='/admin';

            }else if (this.loginService.getUserRole()=='USER'){
              // window.location.href='/user';
              this.router.navigate(['home']);
              this.loginService.loginStatusSubject.next(true);
              window.location.href='/#';
            } else {
              this.loginService.logout();
              Swal.fire({
                title: 'Permiso denegado',
                text: 'No tiene permisos para acceder a esta página',
                icon: 'warning',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#2d336b'
              });
              return;

            }
          })
        }, (error)=>{
          Swal.fire({
            title: 'Error',
            text: 'Email o contraseña incorrectos',
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#2d336b'
          });


        }
    );

  }
}
