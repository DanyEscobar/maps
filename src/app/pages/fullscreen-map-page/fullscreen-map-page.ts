import { DecimalPipe, JsonPipe } from '@angular/common';
import { Component, AfterViewInit, viewChild, ElementRef, signal, effect } from '@angular/core';
import * as L from 'leaflet';
import { FullScreen } from 'leaflet.fullscreen';

@Component({
  selector: 'app-fullscreen-map-page',
  imports: [
    JsonPipe,
    DecimalPipe,
  ],
  templateUrl: './fullscreen-map-page.html',
})
export class FullscreenMapPage implements AfterViewInit { 
  
  public divElement = viewChild<ElementRef<HTMLDivElement>>('map');
  public map = signal<L.Map | null>(null);
  public zoom = signal(14);
  public coordinates = signal({
    lng: -74.5,
    lat: 40,
  });


  public zoomEffect = effect(() => {
    if (!this.map()) return;
    this.map()?.setZoom(this.zoom());
  });
 
  ngAfterViewInit() {
    this.mapReady();
  }

  async mapReady(): Promise<void> {
    if (!this.divElement()) return;

    await new Promise(resolve => setTimeout(resolve, 80));

    const { lng, lat } = this.coordinates();

    const map = L.map(this.divElement()!.nativeElement).setView(
      [lat, lng], 
      this.zoom()
    );
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 1,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    this.mapListener(map);
  }


  mapListener( map: L.Map ) {
    map.on('zoom', (event) => {
      const newZoom = event.target.getZoom();
      this.zoom.set(newZoom);
    });

    map.on('moveend', () => {
      const center = map.getCenter();
      this.coordinates.set(center);
    });

    map.whenReady(() => {
      console.log('Mapa cargado');
    });

    map.addControl(new FullScreen());
    map.addControl(new L.Control.Scale());
    
    this.map.set(map);
  }
}
