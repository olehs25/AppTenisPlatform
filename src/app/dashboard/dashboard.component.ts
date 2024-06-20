import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { TranslateService } from "@ngx-translate/core";
import { Observable, combineLatest } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  private breakpointObserver = inject(BreakpointObserver);

  constructor(public translate: TranslateService) {
    this.translate.use(window.navigator.language);
  }

  ngOnInit(): void {
    this.loadInstagramScript();
  }

  /** Based on the screen size, switch from standard to one column per row */
  cards$: Observable<any[]> = combineLatest([
    this.breakpointObserver.observe(Breakpoints.Handset),
    this.translate.stream('DASHBOARD')
  ]).pipe(
    map(([breakpoint, translations]) => {
      const isHandset = breakpoint.matches;
      const cardData = [
        {
          title: translations.WHY_CHOOSE,
          body: translations.WHY_CHOOSE_BODY,
          cols: isHandset ? 2 : 2,
          rows: 1
        },
        {
          title: translations.TENNIS_SCHOOL,
          body: translations.TENNIS_SCHOOL_BODY,
          cols: isHandset ? 1 : 1,
          rows: 1
        },
        {
          title: translations.COURT_RESERVATION,
          body: translations.COURT_RESERVATION_BODY,
          cols: isHandset ? 1 : 1,
          rows: 1
        },
        {
          title: translations.FACILITIES,
          body: translations.FACILITIES_BODY,
          cols: isHandset ? 2 : 2,
          rows: 1
        }
      ];
      return cardData;
    })
  );

  imageObject = [
    {
      image: './assets/images/tenis1.jpg',
      thumbImage: './assets/images/tenis1.jpg'
    },
    {
      image: './assets/images/tenis2.jpg',
      thumbImage: './assets/images/tenis2.jpg'
    },
    {
      image: './assets/images/tenis3.jpg',
      thumbImage: './assets/images/tenis3.jpg'
    },
    {
      image: './assets/images/tenis4.jpg',
      thumbImage: './assets/images/tenis4.jpeg'
    },
    {
      image: './assets/images/tenis5.jpg',
      thumbImage: './assets/images/tenis5.png'
    },
    {
      image: './assets/images/tenis6.jpg',
      thumbImage: './assets/images/tenis6.jpg'
    },
    {
      image: './assets/images/tenis8.jpg',
      thumbImage: './assets/images/tenis8.jpg'
    },
    {
      image: './assets/images/tenis6.jpg',
      thumbImage: './assets/images/tenis9.jpg'
    }
  ];

  loadInstagramScript(): void {
    if (document) {
      const script = document.createElement('script');
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }
}
