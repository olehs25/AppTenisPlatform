import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import usuarioJson from '../assets/data/usuario.json'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {
  title = 'Escuela Tenis Olula del Rio';

  public constructor() {
  }

}


