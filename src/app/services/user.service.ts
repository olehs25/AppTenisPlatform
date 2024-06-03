import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {API_URL, API_URL_CHECK_EMAIL, API_URL_REGISTER} from "./helper";
import {userDTO} from "../models/userDTO";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  getItem(key : string){
    const item = localStorage.getItem(key);
    return (item) ? JSON.parse(item) : null;
  }

  setItem(key : string, value:any){
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key : string){
      localStorage.removeItem(key);
  }

  clear(){
    localStorage.clear();
  }
  public checkEmail(email: string) {
    return this.httpClient.get(API_URL_CHECK_EMAIL + email);
  }

  public getUser(id: number):Observable<userDTO> {
    return this.httpClient.get<userDTO>(API_URL+"/getUser/" + id).pipe(
      catchError(this.handleError)
    );
  }

  // obtener un usuario por id
  public obtenerUsuario(id:number){
    return this.httpClient.get(API_URL+"/getUser/"+id);
  }

  public registrarUsuario(usuario:any){
    return this.httpClient.post(API_URL_REGISTER, usuario);
  }

  //actualizar un usuario por id
  public actualizarUsuario(id:number, usuario:any){
    return this.httpClient.put(API_URL+"/updateUser/"+id, usuario);
  }
  private handleError(error:HttpErrorResponse){
    if(error.status==0){
      console.error('Se ha producido un error ',error.status, error.error)
    }else{
      console.error('Backend retornó el codigo de estado ',error.status, error.error)
    }
    return throwError(() => new Error('Algo falló. Por favor intente nuevamente.'))
  }
}

