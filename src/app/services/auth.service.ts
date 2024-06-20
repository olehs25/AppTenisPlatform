import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL_CURRENT_USER, API_URL_TOKEN } from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  // Se genera el token de acceso
  generateToken(loginData: any) {
    return this.http.post(API_URL_TOKEN, loginData);
  }

  // Iniciamos sesion y se guarda el token en el local storage
  loginUser(token: any) {
    localStorage.setItem('token', token);
    return true;
  }

  // Comprobamos si el usuario está logueado
  isLoggedIn() {
    let token = localStorage.getItem('token');
    return token !== undefined && token !== '' && token !== null;
  }

  // Eliminamos el token del local storage al cerrar sesión
  logout() {
    localStorage.removeItem('token');
    return true;
  }

  // Obtenemos el token
  getToken() {
    return localStorage.getItem('token');
  }


  // Seteamos el usuario
 // setUser(user: any) {
   // localStorage.removeItem('user');
   // localStorage.setItem('user', JSON.stringify(user));
  //}

  // Obtenemos el usuario decodificado del token
  getUser() {
    const decodedToken = this.decodeToken();
    if (decodedToken) {
      return decodedToken;
    } else {
      this.logout();
      return null;
    }
  }

  // Obtenemos el rol del usuario
  getUserRole() {
    const user = this.getUser();
    console.log("ROLLLLLLLL: " + user?.role);
    return user?.role;
  }

  // Obtenemos el fullname del usuario
  getUserFullName() {
    const user = this.getUser();
    return user?.fullName;
  }

  // Obtenemos el email del usuario
  getUserEmail() {
    const user = this.getUser();
    return user?.email || 'user@example.com';
  }

  /// Obtenemos el estado de suscripción del usuario
  getUserIsSuscribed() {
    const user = this.getUser();
    console.log("suscrito a la escuela: " + user?.isSuscribed);
    return user?.isSuscribed;
  }

  // Obtenemos el ID del usuario
  getUserId() {
    const user = this.getUser();
    console.log("suscrito a la escuela: " + user?.id);
    return user?.id;
  }

//  setIsSuscribed(user: any) {
  //  this.setUser(user);
  //}

  public getCurrentUser(username: any) {
    console.log("USUARIOOO: " + username);
    return this.http.get(API_URL_CURRENT_USER + "/" + username);
  }

  private decodePayload(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  // Decodificar token para obtener datos del usuario
  decodeToken() {
    const token = this.getToken();
    if (token) {
      return this.decodePayload(token);
    }
    return null;
  }

  printUserData() {
    const userData = this.decodeToken();
    if (userData) {
      console.log("Datos del usuario decodificados: ", userData);
    } else {
      console.log("No se pudo decodificar el token o no hay token disponible.");
    }
  }

  updateToken(token: string) {
    localStorage.setItem('token', token);
  }
}
