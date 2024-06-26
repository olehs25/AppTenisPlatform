import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userService: UserService,
    public ref: MatDialogRef<EditProfileComponent>,
    public builder: FormBuilder,
    public authService: AuthService,
    public translate: TranslateService
  ) {
    this.translate.use(window.navigator.language);
  }

  public user = {
    fullName: '',
    username: '',
    email: '',
    personalPhone: '',
    nif: '',
    country: '',
  };
  inputData: any;
  editData: any;
  hide = true;

  myform = this.builder.group({
    fullName: this.builder.control(''),
    username: this.builder.control(''),
    email: this.builder.control(''),
    personalPhone: this.builder.control(''),
    nif: this.builder.control(''),
    country: this.builder.control(''),
  });

  updateUsuario() {
    this.userService.actualizarUsuario(this.inputData.id, this.myform.value).subscribe(
      (result: any) => {
        Swal.fire({
          title: this.translate.instant('EDIT_PROFILE.MODIFIED_SUCCESS'),
          text: this.translate.instant('EDIT_PROFILE.MODIFIED_SUCCESS_TEXT'),
          icon: 'success',
          confirmButtonText: this.translate.instant('EDIT_PROFILE.ACCEPT'),
          confirmButtonColor: '#2d336b',
        }).then(() => {
          // Aquí actualizar el token
          const updatedToken = result.token;
          this.authService.updateToken(updatedToken);
          console.log("SE HA MODIFICADO EL USER: " + result.fullName);
          this.ref.close(this.myform.value);
          location.reload(); // Recargar la página
        });
      },
      (error) => {
        Swal.fire({
          title: this.translate.instant('EDIT_PROFILE.MODIFIED_ERROR'),
          text: this.translate.instant('EDIT_PROFILE.MODIFIED_ERROR_TEXT'),
          icon: 'error',
          confirmButtonText: this.translate.instant('EDIT_PROFILE.ACCEPT'),
          confirmButtonColor: '#2d336b',
        });
      }
    );
  }

  setPopUpData(id: number) {
    this.userService.obtenerUsuario(this.inputData.id).subscribe(
      (result) => {
        this.editData = result;
        this.myform.setValue({
          fullName: this.editData.fullName,
          username: this.editData.username,
          email: this.editData.email,
          personalPhone: this.editData.personalPhone,
          nif: this.editData.nif,
          country: this.editData.country,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
    this.inputData = this.data;
    if (this.inputData.id > 0) {
      this.setPopUpData(this.inputData.id);
    }
  }
}
