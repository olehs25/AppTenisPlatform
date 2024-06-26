import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private paymentUrl = 'providerPaymentURL'; // URL del endpoint de simulación de pago

  constructor(private http: HttpClient) { }

  makePayment(amount: number): Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer xxxxxxxxxxxxxxxxxxxxxx`
    });

    const body = {
      amount: amount,
      currency: 'USD',
      description: 'Pago de prueba'
    };

    // Simula un pago exitoso
    return this.http.post<boolean>(this.paymentUrl, body, { headers });
  }
}
