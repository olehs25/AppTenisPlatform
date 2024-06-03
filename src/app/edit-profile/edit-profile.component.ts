
import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data:any,
    public userService: UserService,
    public ref: MatDialogRef<EditProfileComponent>,
    public builder: FormBuilder,
    public authService: AuthService
  ) {}


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
      (result : any) => {
        Swal.fire({
          title: 'Datos modificados',
          text: 'Datos del usuario modificados correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#2d336b',
        });
        this.authService.setUser(result)
      },
      (error) => {
        Swal.fire({
          title: 'Datos no modificados',
          text: 'Los datos del usuario no se han podido modificar',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#2d336b',
        });
      }
    );
    this.ref.close(this.myform.value);

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
