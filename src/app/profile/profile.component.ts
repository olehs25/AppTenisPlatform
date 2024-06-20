import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {userDTO} from "../models/userDTO";
import {AuthService} from "../services/auth.service";
import { MatDialog } from '@angular/material/dialog';
import {EditProfileComponent} from "../edit-profile/edit-profile.component";
import {TranslateService} from "@ngx-translate/core";
import {UpdatePasswordComponent} from "../update-password/update-password.component";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  errorMessage:string="";
  user?:userDTO;
  constructor(public userService: UserService, public authService: AuthService, public dialog: MatDialog,
              public translate: TranslateService) {
    this.cargarUsuario();
    /*
    this.userService.getUser(1).subscribe({
      next: (userData) =>{
        this.user= userData;
      },
      error: (errorData) =>{
        this.errorMessage= errorData;
      },
      complete: () =>{
        console.info("User Data ok")
    }
    });

     */
    this.translate.use(window.navigator.language);
  }
  openPopUpAcciones(id: number, title: string, user?: any) {
    const isMobile = window.matchMedia('(max-width: 600px)').matches; // Establece el tamaño máximo para dispositivos móviles

    const width = isMobile ? '90%' : '30%';

    const _popUp = this.dialog.open(EditProfileComponent, {
      width: width,
      autoFocus: false,
      data: {id: id, title: title, user: user},


    });
    _popUp.afterClosed().subscribe((result) => {
      console.log("RESULT: "+result)

        this.user = this.authService.getUser()

    });
    return this.user;
  }

  editarUsuario(id: number) {
    console.log("ID DE USER DE EDIT: "+id);
   this.user =  this.openPopUpAcciones(id, 'Editar usuario');
    console.log("fullanme DESUES DE EDITAR: "+this.user?.fullName)

  }

  updatePass() {
    const isMobile = window.matchMedia('(max-width: 600px)').matches;
    const width = isMobile ? '90%' : '30%';

    this.dialog.open(UpdatePasswordComponent, {
      width: width,
      autoFocus: false,
    });
  }


  cargarUsuario() {
    this.user = this.authService.getUser();
    console.log("usuario final: "+this.user?.fullName)
    return this.user

  }

  ngOnInit(): void {
  }

  protected readonly origin = origin;
}

