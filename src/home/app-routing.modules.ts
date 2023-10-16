
import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {TenisDashboardComponent} from "../app/tenis-dashboard/tenis-dashboard.component";
import {LoginComponent} from "../app/login/login.component";
import {ProfileComponent} from "../app/profile/profile.component";
import {RegisterComponent} from "../app/register/register.component";
import {MapComponent} from "../app/map/map.component";
import {EditProfileComponent} from "../app/edit-profile/edit-profile.component";

const routes: Routes = [
  {
    path: 'home', component: TenisDashboardComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'profile', component: ProfileComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'map', component: MapComponent
  },
  {
    path: 'edit-profile', component: EditProfileComponent
  },
  {
    path: '**', component: TenisDashboardComponent
  },

]

@NgModule({
  declarations: [],
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]


})

export class AppRoutingModule { }
