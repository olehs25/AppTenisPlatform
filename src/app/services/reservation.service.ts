import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {API_URL, API_URL_CHECK_EMAIL, API_URL_REGISTER, API_URL_RESERVATION} from "./helper";
import {reservationDTO} from "../models/reservationDTO";
import {catchError, Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservas:any = [
    { id: 1, userEmail: 'oleh@gmail.com', reservationDate: '2024-06-01', isCreated: 1, isPaid: 0, creationDate: '2024-06-01 18:07:39.000000', isDeleted: 0},
    { id: 2, userEmail: 'oleh2@gmail.com', reservationDate: '2024-06-02', isCreated: 1, isPaid: 0, creationDate: '2024-06-01 18:07:39.000000', isDeleted: 0 }
  ];
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

  // obtener all reservas
  public getAllReservations():any{
    return this.httpClient.get(API_URL_RESERVATION+"getReservations");
  }

  // obtener un reserva por id
  public getReservation(id:number){
    //const reserva = this.reservas.find(r => r.id === id);
    //return of(reserva);
    return this.httpClient.get(API_URL_RESERVATION+"getReservation/"+id);
  }

  public registrarReserva(reservation:any){
    return this.httpClient.post(API_URL_RESERVATION+"putReservation", reservation);
  }

  public borrarReserva(id:number){
    return this.httpClient.get(API_URL_RESERVATION+"deleteReservation/"+id);
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

