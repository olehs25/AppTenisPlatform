import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide = true;
  hideRepeat = true;

  public user = {
    fullName: '',
    country: '',
    email: '',
    language: '',
    nif: '',
    personalPhone: '',
    password: '',
    repeatPassword: ''
  };

  constructor(
    private userService: UserService,
    public translate: TranslateService
  ) {
    this.translate.use(window.navigator.language);
  }

  ngOnInit(): void {}

  checkEmail(email: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.userService.checkEmail(email).subscribe(
        (data: boolean) => {
          if (!data) {
            console.log("Devolución del check del back: " + data);
            resolve(false);
          }else{
            console.log("Devolución del check del back: " + data);
            resolve(true);
          }
        }
      );
    });
  }

  formSubmit() {
    console.log('Form submitted');
    console.log(this.user);
    if (
      this.user.fullName == '' ||
      this.user.country == '' ||
      this.user.email == '' ||
      this.user.language == '' ||
      this.user.nif == '' ||
      this.user.personalPhone == '' ||
      this.user.password == '' ||
      this.user.repeatPassword == ''
    ) {
      Swal.fire({
        title: this.translate.instant('REGISTER.REQUIRED_FIELDS'),
        text: this.translate.instant('REGISTER.REQUIRED_FIELDS'),
        icon: 'warning',
        confirmButtonColor: '#2d336b',
        confirmButtonText: this.translate.instant('REGISTER.ACCEPT'),
      });
      return;
    }

    // Compruebo que el email sea correcto
    if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(this.user.email)) {
      Swal.fire({
        title: this.translate.instant('REGISTER.INVALID_EMAIL'),
        text: this.translate.instant('REGISTER.INVALID_EMAIL'),
        icon: 'info',
        confirmButtonText: this.translate.instant('REGISTER.ACCEPT'),
        confirmButtonColor: '#2d336b',
      });
      return;
    }
    // Compruebo que el teléfono sea correcto (9 dígitos)
    if (!/^[0-9]{9}$/.test(this.user.personalPhone)) {
      Swal.fire({
        title: this.translate.instant('REGISTER.INVALID_PHONE'),
        text: this.translate.instant('REGISTER.INVALID_PHONE'),
        icon: 'info',
        confirmButtonText: this.translate.instant('REGISTER.ACCEPT'),
        confirmButtonColor: '#2d336b',
      });
      return;
    }

    // Añadir "+34" al número de teléfono si no lo tiene
    if (!this.user.personalPhone.startsWith('+34')) {
      this.user.personalPhone = '+34' + this.user.personalPhone;
    }

    // Compruebo que la contraseña tenga al menos 8 caracteres
    if (this.user.password.length < 8) {
      Swal.fire({
        title: this.translate.instant('REGISTER.INVALID_PASSWORD'),
        text: this.translate.instant('REGISTER.INVALID_PASSWORD'),
        icon: 'info',
        confirmButtonText: this.translate.instant('REGISTER.ACCEPT'),
        confirmButtonColor: '#2d336b',
      });
      return;
    }
    // Compruebo que las contraseñas coincidan
    if (this.user.password !== this.user.repeatPassword) {
      Swal.fire({
        title: this.translate.instant('REGISTER.PASSWORD_MISMATCH'),
        text: this.translate.instant('REGISTER.PASSWORD_MISMATCH_MSG'),
        icon: 'warning',
        confirmButtonColor: '#2d336b',
        confirmButtonText: this.translate.instant('REGISTER.ACCEPT'),
      });
      return;
    }

    this.checkEmail(this.user.email).then(
      (data) => {
        if (data) {
          console.log('El email está registrado: ' + data);
          Swal.fire({
            title: this.translate.instant('REGISTER.EMAIL_REGISTERED'),
            text: this.translate.instant('REGISTER.EMAIL_ALREADY_REGISTERED'),
            icon: 'warning',
            confirmButtonText: this.translate.instant('REGISTER.ACCEPT'),
            confirmButtonColor: '#2d336b',
          });
        } else {
          console.log('El email no está registrado: ' + data);
          this.userService.registrarUsuario(this.user).subscribe(
            (data: any) => {
              console.log(data);
              const username = this.user.email.split('@')[0]; // Extract the part before @ as username
              Swal.fire({
                title: this.translate.instant('REGISTER.USER_REGISTERED'),
                html: this.translate.instant('REGISTER.USERNAME') + ` <span style="color: red;">${username}</span>`,
                icon: 'success',
                confirmButtonText: this.translate.instant('REGISTER.ACCEPT'),
                confirmButtonColor: '#2d336b',
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = '/login';
                }
              });
            },
            (error: any) => {
              console.log(error);
              Swal.fire({
                title: this.translate.instant('REGISTER.REGISTRATION_ERROR'),
                text: this.translate.instant('REGISTER.REGISTRATION_ERROR'),
                icon: 'error',
                confirmButtonText: this.translate.instant('REGISTER.ACCEPT'),
                confirmButtonColor: '#2d336b',
              });
            }
          );
        }
      },
      (error) => {
        console.log('Error checking email: ' + error);
        Swal.fire({
          title: this.translate.instant('REGISTER.EMAIL_ALREADY_REGISTERED'),
          text: this.translate.instant('REGISTER.CHECK_ERROR_MSG'),
          icon: 'error',
          confirmButtonText: this.translate.instant('REGISTER.ACCEPT'),
          confirmButtonColor: '#2d336b',
        });
      }
    );
  }
}
