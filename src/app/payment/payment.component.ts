import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import {TranslateService} from "@ngx-translate/core";


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

    constructor(private route: ActivatedRoute, private router: Router,
                public translate: TranslateService) {
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
        });
    }

    selectPaymentMethod(method: string) {
        this.selectedPaymentMethod = method;
    }

    processPayment() {
        // Aquí puedes añadir la lógica para procesar el pago con tarjeta de crédito
        alert('Processing credit card payment...');
    }

    processPaypalPayment() {
        // Aquí puedes añadir la lógica para procesar el pago con PayPal
        alert('Processing PayPal payment...');
    }

  goToReservations() {
    this.router.navigate(['reservation']);
  }
}
