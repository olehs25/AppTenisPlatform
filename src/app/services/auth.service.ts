import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL_CURRENT_USER, API_URL_TOKEN } from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http:HttpClient) { }

  //Se genera el token de acceso
  generateToken(loginData:any){
    return this.http.post(API_URL_TOKEN,loginData);
  }

  //Iniciamos sesion y se guarda el token en el local storage
  loginUser(token:any){
    localStorage.setItem('token',token);
    return true;
  }



  //Comprobamos si el usuario esta logueado
  isLoggedIn(){
    let token = localStorage.getItem('token');
    if(token == undefined || token == '' || token == null){
      return false;
    }else{
      return true;
    }
  }

  //Eliminamos el token del local storage al cerrar sesion
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //Obtenemos el token
  getToken(){
    return localStorage.getItem('token');
  }

  //seteamos el usuario
  setUser(user:any){
    localStorage.removeItem('user');
    localStorage.setItem('user',JSON.stringify(user));
  }

  //Obtenemos el usuario
  getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr != null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  //Obtenemos el rol del usuario
  getUserRole(){
    let user = this.getUser();
    console.log("ROLLLLLLLL: "+user.role);

    return user.role;
  }

  //Obtenemos el fullname del usuario
  getUserFullName(){
    let user = this.getUser();
    return user.fullName;
  }

  //Obtenemos el email del usuario
  getUserEmail(){
    let user = this.getUser();
    if(user==null)
      user.email= 'user@example.com';
    return user.email;
  }

  //Obtenemos el email del usuario
  getUserIsSuscribed(){
    let user = this.getUser();
    console.log("suscrito a la escuela: "+user.isSuscribed)
    return user.isSuscribed;
  }

  //Obtenemos el email del usuario
  getUserId(){
    let user = this.getUser();
    console.log("suscrito a la escuela: "+user.id)
    return user.id;
  }

  setIsSuscribed(user: any){

    this.setUser(user)
  }

  public getCurrentUser(username:any){
    console.log("USUARIOOO: "+username);
    return this.http.get(API_URL_CURRENT_USER+"/"+username);
  }
}
