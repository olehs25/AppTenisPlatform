import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TenisbarComponent} from "../app/tenisbar/tenisbar.component";
import {RegisterComponent} from "../app/register/register.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {TenisDashboardComponent} from "../app/tenis-dashboard/tenis-dashboard.component";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {MatMenuModule} from "@angular/material/menu";
import {LoginComponent} from "../app/login/login.component";
import {MatChipsModule} from "@angular/material/chips";
import {RouterOutlet} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule} from "@angular/material/button";
import { MapComponent } from "../app/map/map.component";
import { ProfileComponent} from "../app/profile/profile.component";
import { AppRoutingModule} from "./app-routing.modules";
import { TenisFooterComponent} from "../app/tenis-footer/tenis-footer.component";
import {MdbRippleModule} from "mdb-angular-ui-kit/ripple";


@NgModule({
  declarations: [
    AppComponent,
    TenisbarComponent,
    RegisterComponent,
    TenisDashboardComponent,
    LoginComponent,
    MapComponent,
    ProfileComponent,
    TenisFooterComponent

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
    MdbRippleModule
  ],
  exports: [TenisbarComponent, TenisFooterComponent],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
