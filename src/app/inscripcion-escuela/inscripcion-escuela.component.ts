import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from '../services/payment.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'app-inscripcion-escuela',
  templateUrl: './inscripcion-escuela.component.html',
  styleUrls: ['./inscripcion-escuela.component.scss']
})
export class InscripcionEscuelaComponent {
  jobs: any[] = [];
  registrationForm: FormGroup;
  isSubscribed: boolean = false;
  paymentSuccessful: boolean = false;
  chatResponse: string = '';
  response: string = '';
  error: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private paymentService: PaymentService,
    private authService: AuthService,
    private userService: UserService,
    public translate: TranslateService
  ) {
    this.registrationForm = this.formBuilder.group({
      age: ['', Validators.required],
      level: ['', Validators.required]
    });
    this.translate.use(window.navigator.language);
  }

  ngOnInit() {
    this.isSubscribed = this.authService.getUserIsSuscribed();
    console.log("SUSCRIPCION: " + this.isSubscribed)
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.paymentService.makePayment(50).subscribe(success => {
        if (success) {
          localStorage.setItem('isSubscribed', 'true');
          this.isSubscribed = true;
          this.paymentSuccessful = true;
        }
      });
    }
  }

  onSubscribe() {
    const userId = this.authService.getUserId();
    console.log("IDDD: " + userId)
    this.userService.subscribeUser(userId).subscribe(
      (response) => {
        this.isSubscribed = true;
        //this.authService.setIsSuscribed(response)
        this.paymentSuccessful = true;
        // Aquí actualizar el token
        const updatedToken = response.token; // Asegúrate de que el backend devuelva un token actualizado
        this.authService.updateToken(updatedToken);
      },
      (error) => {
        console.error('Error subscribing user:', error);
      }
    );
  }

}
