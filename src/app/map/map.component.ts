import { Component, AfterViewInit } from '@angular/core';
import { circle, Map, tileLayer } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  ngAfterViewInit() {
    const map = new Map('map').setView([37.35015, -2.29615], 16);

    tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 19,
      attribution: 'Tiles © Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }).addTo(map);

    circle([37.35010, -2.29612], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 30
    }).addTo(map).bindPopup("Pistas de Tenis Olula del Rio");
  }
}
