import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent {
  updatePasswordForm: FormGroup;
  hideCurrent = true;
  hideNew = true;
  hideConfirm = true;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdatePasswordComponent>,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.updatePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    });
  }

  updatePassword() {
    if (this.updatePasswordForm.valid) {
      const userId = this.authService.getUserId();
      const { currentPassword, newPassword, confirmPassword } = this.updatePasswordForm.value;

      if (newPassword !== confirmPassword) {
        Swal.fire({
          title: 'Error',
          text: 'Las contraseñas no coinciden',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#2d336b',
        });
        return;
      }

      this.userService.updatePassword(userId, currentPassword, newPassword).subscribe(
        () => {
          Swal.fire({
            title: 'Éxito',
            text: 'Contraseña actualizada correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#2d336b',
          }).then(() => {
            this.dialogRef.close();
          });
        },
        (error) => {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo actualizar la contraseña',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#2d336b',
          });
        }
      );
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
