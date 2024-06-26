import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import {TranslateService} from "@ngx-translate/core";
import { ReservationService } from "../services/reservation.service";


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {

    userMail: string | null = null;
    start: string | null = null;
    finalstart: string | null = null;
    end: string | null = null;
    price: number | null = null;
    selectedPaymentMethod: string | null = null;
    id: number | null = null;

    constructor(private route: ActivatedRoute, private router: Router,
                public translate: TranslateService, public reservationService: ReservationService) {
      this.translate.use(window.navigator.language);

    }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.userMail = params['userMail'];
            this.finalstart = params['start'];
            this.finalstart?.substring(1,2);
            console.log("+++++: "+this.finalstart)
            this.start = this.finalstart
            this.end = params['end'];
            this.price = params['price'];
            this.id = params['id'];
        });
    }

    selectPaymentMethod(method: string) {
        this.selectedPaymentMethod = method;
    }

    processPayment() {
        alert('Processing credit card payment...');
    }

    processPaypalPayment() {
        alert('Processing PayPal payment...');
    }

  goToReservations() {
    const isPaid = this.selectedPaymentMethod !== 'mano' ? 1 : 0;
    const updateData = {
      isPaid: isPaid
    };

    if (this.id) {
      this.reservationService.updateReservation(this.id, updateData).subscribe(
        response => {
          console.log('Reservation updated successfully', response);
          this.router.navigate(['reservation']);
        },
        error => {
          console.error('Error updating reservation', error);
        }
      );
    } else {
      console.error('Reservation ID is missing');
    }
  }
}
