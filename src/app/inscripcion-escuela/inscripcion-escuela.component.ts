import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from '../services/payment.service';
import { AuthService } from '../services/auth.service';
import { UiPathService} from "../services/uipath.service";
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-inscripcion-escuela',
  templateUrl: './inscripcion-escuela.component.html',
  styleUrls: ['./inscripcion-escuela.component.scss']
})
export class InscripcionEscuelaComponent {

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
    private uiPathService: UiPathService,
    private userService: UserService
  ) {
    this.registrationForm = this.formBuilder.group({
      age: ['', Validators.required],
      level: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.isSubscribed = this.authService.getUserIsSuscribed();
    console.log("SUSCRIPCION: "+this.isSubscribed)
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
    const userId = this.authService.getUserId(); // Supongamos que tienes este método en AuthService
    console.log("IDDD: "+userId)
    this.userService.subscribeUser(userId).subscribe(
      (response) => {
        this.isSubscribed = true;
        this.authService.setIsSuscribed(response)
        this.paymentSuccessful = true;

      },
      (error) => {
        console.error('Error subscribing user:', error);
      }
    );
  }


  connectToRobot(): void {
    this.uiPathService.authenticate().subscribe(accessToken => {
      this.uiPathService.startJob('1045166', accessToken).subscribe(response => {
        console.log('Job started:', response);
      }, error => {
        console.error('Error starting job:', error);
      });
    }, error => {
      console.error('Error authenticating:', error);
    });
  }
}
