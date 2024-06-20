
import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {LoginComponent} from "../app/login/login.component";
import {ProfileComponent} from "../app/profile/profile.component";
import {RegisterComponent} from "../app/register/register.component";
import {MapComponent} from "../app/map/map.component";
import {EditProfileComponent} from "../app/edit-profile/edit-profile.component";
import {DashboardComponent} from "../app/dashboard/dashboard.component";
import {ReservationComponent} from "../app/reservation/reservation.component";
import {PaymentComponent} from "../app/payment/payment.component";
import {InscripcionEscuelaComponent} from "../app/inscripcion-escuela/inscripcion-escuela.component";
import {AuthGuard} from "../app/services/auth.guard";
import { ReservationListComponent } from '../app/reservation-list/reservation-list.component';


const routes: Routes = [
  {
    path: 'home', component: DashboardComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'map', component: MapComponent
  },
  {
    path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuard]
  },
  {
    path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]
  },
  {
    path: 'reservation', component: ReservationComponent, canActivate: [AuthGuard]
  },
  {
    path: 'payment', component: PaymentComponent, canActivate: [AuthGuard]
  },
  {
    path: 'inscription', component: InscripcionEscuelaComponent, canActivate: [AuthGuard]
  },
  {
    path: 'reservation-list', component: ReservationListComponent, canActivate: [AuthGuard]
  },
  {
    path: '**', component: DashboardComponent
  },



]

@NgModule({
  declarations: [],
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]


})

export class AppRoutingModule { }
