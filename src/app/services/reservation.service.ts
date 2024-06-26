import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { API_URL_RESERVATION} from "./helper";
import {reservationDTO} from "../models/reservationDTO";
import {Observable} from "rxjs";


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

  public registrarReserva(reservation:any): Observable<reservationDTO>{
    return this.httpClient.post<reservationDTO>(API_URL_RESERVATION+"putReservation", reservation);
  }

  public borrarReserva(id:any){
    return this.httpClient.delete(API_URL_RESERVATION+"deleteReservation/"+id);
  }

  updateReservation(id: number, data: any) {
    return this.httpClient.put(API_URL_RESERVATION+"updateReservation/"+id, data);
  }
}

