import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import * as L from 'leaflet';
import { v4 as uuid } from 'uuid';
import { JsonPipe } from '@angular/common';

interface Marker {
  id: string;
  color: string;
  leafletMarker: L.Marker;
}

@Component({
  selector: 'app-markers-page',
  imports: [
    JsonPipe,
  ],
  templateUrl: './markers-page.html',
})
export class MarkersPage implements AfterViewInit { 

  public markers = signal<Marker[]>([]);
  public divElement = viewChild<ElementRef<HTMLDivElement>>('map');
  public map = signal<L.Map | null>(null);
  public coordinates = signal({
    lng: -74.5,
    lat: 40, 
  });
  public createCustomIcon(color: string) {
    return L.divIcon({
      className: 'custom-icon',
      html: `
        <div>
          <img src="/assets/leaflet/marker-shadow.png" 
               style="width: 41px; height: 41px; position: absolute; left: 0; top: 0; pointer-events: none;">
          <svg width="25" height="41" viewBox="0 0 25 41" fill="none" xmlns="http://www.w3.org/2000/svg" 
               style="position: relative;">
            <path d="M12.5 0C5.596 0 0 5.596 0 12.5C0 21.875 12.5 41 12.5 41C12.5 41 25 21.875 25 12.5C25 5.596 19.404 0 12.5 0Z" fill="${color}"/>
            <circle cx="12.5" cy="12.5" r="5" fill="white"/>
          </svg>
        </div>`,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });
  }
  public zoom = signal(10);
  // Nota: Leaflet no tiene la propiedad 'color' en IconOptions. 
  // Usa imágenes (.png) o L.divIcon para colores.
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

    // const marker = L.marker([lat, lng], {
    //   icon: this.myIcon,
    //   draggable: false,
    // }).addTo(map);

    // marker.on('dragend', (event) => {
    //   console.log(event.target.getLatLng());
    // });

    this.mapListener(map);
  }
  
  
  mapListener( map: L.Map ) {

    map.on('click', (event) => this.mapClick(event));
    
    this.map.set(map);
  }

  mapClick(event: L.LeafletMouseEvent) {
    if (!this.map()) return;

    const map = this.map()!;
    const color = '#xxxxxx'.replaceAll('x', () =>
      (Math.trunc(Math.random() * 16)).toString(16)
    );
    const coords = event.latlng;

    const marker = L.marker([0, 0], {
      icon: this.createCustomIcon(color),
      draggable: true,
    }).setLatLng([coords.lat, coords.lng]).addTo(map);

    const newMarker: Marker = {
      id: uuid(),
      color,
      leafletMarker: marker,
    }

    // this.markers.set([newMarker, ...this.markers()]);
    this.markers.update(markers => [newMarker, ...markers]);

    console.log(this.markers());
  }

  flyToMarker(latLng: L.LatLng) {
    if (!this.map()) return;

    const map = this.map()!;
    map.flyTo(latLng, this.zoom());
  }

  deleteMarker(marker: Marker) {
    if (!this.map()) return;

    const map = this.map()!;
    // map.removeLayer(marker.leafletMarker);
    marker.leafletMarker.remove();
    // this.markers.set(this.markers().filter(m => m.id !== marker.id));
    this.markers.update(markers => markers.filter(m => m.id !== marker.id));
  }

  stopEvent(event: Event) {
    event.stopPropagation();
  }
}
