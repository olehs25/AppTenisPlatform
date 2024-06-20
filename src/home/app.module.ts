import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TenisbarComponent} from "../app/tenisbar/tenisbar.component";
import {RegisterComponent} from "../app/register/register.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatGridListModule} from "@angular/material/grid-list";
import {EditProfileComponent} from "../app/edit-profile/edit-profile.component";
import {MatCardModule} from "@angular/material/card";
import {MatMenuModule} from "@angular/material/menu";
import {LoginComponent} from "../app/login/login.component";
import {MatChipsModule} from "@angular/material/chips";
import {RouterOutlet} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule} from "@angular/material/button";
import { MapComponent } from "../app/map/map.component";
import { ProfileComponent} from "../app/profile/profile.component";
import { AppRoutingModule} from "./app-routing.modules";
import { TenisFooterComponent} from "../app/tenis-footer/tenis-footer.component";
import {MdbRippleModule} from "mdb-angular-ui-kit/ripple";
import {DashboardComponent} from "../app/dashboard/dashboard.component";
import {NgImageSliderModule} from "ng-image-slider";
import {MatDialogModule} from "@angular/material/dialog";
import { FullCalendarModule } from '@fullcalendar/angular';
import { ReservationComponent} from "../app/reservation/reservation.component";
import { PaymentComponent } from '../app/payment/payment.component';
import { ReservationDialog,ViewReservationDialog } from "../app/reservation/reservation.component";
import { CarouselModule } from 'ngx-owl-carousel-o';
import {AuthService} from "../app/services/auth.service";
import {TokenInterceptor} from "../app/services/token.interceptor";
import { InscripcionEscuelaComponent} from "../app/inscripcion-escuela/inscripcion-escuela.component";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import  { WeeklyPlanComponent} from "../app/weekly-plan/weekly-plan.component";
import {TranslateModule, TranslateLoader} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {UpdatePasswordComponent} from "../app/update-password/update-password.component";
import { MatTableModule } from '@angular/material/table';
import { ReservationListComponent } from "../app/reservation-list/reservation-list.component";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    TenisbarComponent,
    RegisterComponent,
    DashboardComponent,
    LoginComponent,
    MapComponent,
    ProfileComponent,
    TenisFooterComponent,
    EditProfileComponent,
    ReservationComponent,
    ReservationDialog, // Dialogo para confirmar reserva
    ViewReservationDialog, // Diálogo para ver y borrar reserva
    PaymentComponent,
    InscripcionEscuelaComponent,
    WeeklyPlanComponent,
    UpdatePasswordComponent,
    ReservationListComponent
  ],
    imports: [
        BrowserModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatIconModule,
        MatGridListModule,
        MatCardModule,
        MatMenuModule,
        MatChipsModule,
        RouterOutlet,
        FormsModule,
        MatInputModule,
        MatSnackBarModule,
        HttpClientModule,
        MatButtonModule,
        AppRoutingModule,
        MdbRippleModule,
        NgImageSliderModule,
        ReactiveFormsModule,
        MatDialogModule,
        FullCalendarModule,
        CarouselModule,
        MatOptionModule,
        MatTableModule,
        MatSelectModule,
        TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    ],
  exports: [TenisbarComponent, TenisFooterComponent],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
