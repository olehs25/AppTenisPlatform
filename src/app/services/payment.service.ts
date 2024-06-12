import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor() { }

  makePayment(amount: number): Observable<boolean> {
    // Simula un pago exitoso
    return of(true);
  }
}
