import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {map, shareReplay} from 'rxjs/operators';
import {Observable} from "rxjs";
import { Router } from '@angular/router';

@Component({
  selector: 'app-tenis-dashboard',
  templateUrl: './tenis-dashboard.component.html',
  styleUrls: ['./tenis-dashboard.component.scss']
})
export class TenisDashboardComponent {

  constructor( private router:Router) {
  }
  private breakpointObserver = inject(BreakpointObserver);

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Escuela de Tenis', cols: 1, rows: 1 },
          { title: 'Reserva de pistas', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
        ];
      }

      return [
        { title: 'Escuela de Tenis', cols: 2, rows: 1 },
        { title: 'Reserva de pistas', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
      ];
    })
  );

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

}
