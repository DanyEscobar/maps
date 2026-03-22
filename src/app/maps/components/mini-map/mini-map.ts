import { AfterViewInit, Component, ElementRef, input, signal, viewChild } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-mini-map',
  imports: [],
  templateUrl: './mini-map.html',
})
export class MiniMap implements AfterViewInit { 

  public divElement = viewChild<ElementRef<HTMLDivElement>>('map');
  public map = signal<L.Map | null>(null);
  public zoom = input<number>(14);
  public lngLat = input<{lng: number, lat: number}>();
  public myIcon = L.icon({
    iconUrl: '/assets/leaflet/marker-icon.png',
    iconRetinaUrl: '/assets/leaflet/marker-icon-2x.png',
    shadowUrl: '/assets/leaflet/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    shadowSize: [41, 41],
  });

   ngAfterViewInit() {
    this.mapReady();
  }

  async mapReady(): Promise<void> {
    if (!this.divElement()) return;

    await new Promise(resolve => setTimeout(resolve, 80));

    const map = L.map(this.divElement()!.nativeElement, {
      zoomControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false,
      keyboard: false,
      dragging: false,
      boxZoom: false
    }).setView(
      [this.lngLat()!.lat, this.lngLat()!.lng], 
      this.zoom()
    );
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 1,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    L.marker([this.lngLat()!.lat, this.lngLat()!.lng], {
      icon: this.myIcon,
      draggable: false,
      interactive: false
    }).addTo(map);

  }
  
}
