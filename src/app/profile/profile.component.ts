import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {userDTO} from "../models/userDTO";
import {AuthService} from "../services/auth.service";
import { MatDialog } from '@angular/material/dialog';
import {EditProfileComponent} from "../edit-profile/edit-profile.component";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  errorMessage:string="";
  user?:userDTO;
  constructor(public userService: UserService, public authService: AuthService, public dialog: MatDialog) {
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
      this.cargarUsuario();
    });

    return this.user;
  }

  editarUsuario(id: number) {
    console.log("ID DE USER DE EDIT: "+id);
   this.user =  this.openPopUpAcciones(id, 'Editar usuario');
    this.cargarUsuario();
    console.log("country DESUES DE EDITAR: "+this.user?.country)
  }


  cargarUsuario() {
    this.user = this.authService.getUser();
    return this.user

  }

  ngOnInit(): void {
  }

  protected readonly origin = origin;
}

