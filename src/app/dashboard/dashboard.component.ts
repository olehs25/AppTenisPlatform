import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  private breakpointObserver = inject(BreakpointObserver);

  ngOnInit(): void {
    this.loadInstagramScript();
  }
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title:'Por qué elegir Club de Tenis Olula del Rio', body: 'body: Elige el Club de Tenis Olula del Río por nuestras ' +
            'modernas instalaciones, entrenadores profesionales y una comunidad apasionada por el tenis. Disfruta de ' +
              'clases personalizadas, torneos emocionantes y un entorno perfecto para mejorar tu juego',
            cols: 2, rows: 1 },
          { title: 'Escuela de Tenis', cols: 1, rows: 1 , body: '¡Comienza una nueva era del Tenis Olula del Rio!\n' +
              'Practica con nosotros este maravilloso deporte de una forma divertida, motivadora y profesional a la vez ' +
              'que sana y beneficiosa para la salud. Clases para todas las edades y niveles.'},
          { title: 'Reserva de pistas', cols: 1, rows: 1 , body: 'Reserva pistas en Olula del Río para disfrutar de instalaciones ' +
              'de primera clase, un entorno natural espectacular y un mantenimiento impecable. Nuestro sistema de reservas es fácil ' +
              'y rápido, garantizando disponibilidad y comodidad para que puedas concentrarte en tu juego. ¡Ven y experimenta el ' +
              'mejor lugar para jugar tenis!'},
          { title: 'Instalaciones', cols: 2, rows: 1, body: 'Nuestras instalaciones en Olula del Río cuentan con 2 pistas de tenis ' +
              'de alta calidad, piscina, y áreas verdes para relajarse. Además, disponemos de 3 canchas de pádel, un campo de ' +
              'fútbol 7, y un restaurante acogedor para disfrutar después del juego. Todo esto en un entorno natural y bien cuidado ' +
              'que fomenta el bienestar y la actividad deportiva.' },

        ];
      }

      return [
        { title:'Por qué elegir Club de Tenis Olula del Rio', body: 'Elige el Club de Tenis Olula del Río por nuestras ' +
            'modernas instalaciones, entrenadores profesionales y una comunidad apasionada por el tenis. Disfruta de ' +
            'clases personalizadas, torneos emocionantes y un entorno perfecto para mejorar tu juego',
          cols: 2, rows: 1 },
        { title: 'Escuela de Tenis', cols: 1, rows: 1 , body: '¡Comienza una nueva era del Tenis Olula del Rio!\n' +
            'Practica con nosotros este maravilloso deporte de una forma divertida, motivadora y profesional a la vez ' +
            'que sana y beneficiosa para la salud. Clases para todas las edades y niveles.'},
        { title: 'Reserva de pistas', cols: 1, rows: 1 , body: 'Reserva pistas en Olula del Río para disfrutar de instalaciones ' +
            'de primera clase, un entorno natural espectacular y un mantenimiento impecable. Nuestro sistema de reservas es fácil ' +
            'y rápido, garantizando disponibilidad y comodidad para que puedas concentrarte en tu juego. ¡Ven y experimenta el ' +
            'mejor lugar para jugar tenis!'},
        { title: 'Instalaciones', cols: 2, rows: 1, body: 'Nuestras instalaciones en Olula del Río cuentan con 2 pistas de tenis ' +
            'de alta calidad, piscina, y áreas verdes para relajarse. Además, disponemos de 3 canchas de pádel, un campo de ' +
            'fútbol 7, y un restaurante acogedor para disfrutar después del juego. Todo esto en un entorno natural y bien cuidado ' +
            'que fomenta el bienestar y la actividad deportiva.' },
      ];
    })

  );
  imageObject = [{
    image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
    thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
  }, {
    image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg',
    thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg'
  }, {
    image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg',
    thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg',
    title: 'Example with title.'
  },{
    image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/7.jpg',
    thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/7.jpg',
  }, {
    image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/1.jpg',
    thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/1.jpg'
  }, {
    image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/2.jpg',
    thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/2.jpg',
  }];

  loadInstagramScript(): void {
    if (document) {
      const script = document.createElement('script');
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }
}
