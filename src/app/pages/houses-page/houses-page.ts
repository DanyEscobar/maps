import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Observable, of, switchMap } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { MiniMap } from '../../maps/components/mini-map/mini-map';

// Mock del servicio (No modificar)
// class UserService {
//   searchUsers(term: string): Observable<string[]> {
//     const users = ['Ana', 'Carlos', 'Beatriz', 'Carmen', 'Alberto', 'Carolina'];
//     if (!term) return of([]);
//     console.log(`Llamada a API con: ${term}`); // Simula el log de red
//     return of(users.filter(u => u.toLowerCase().includes(term.toLowerCase())));
//   }
// }


interface HouseProperty {
  id: string;
  name: string;
  description: string;
  price: number;
  lngLat: { lng: number; lat: number };
  tags: string[];
}

@Component({
  selector: 'app-houses-page',
  imports: [
    // AsyncPipe,
    ReactiveFormsModule,
    CurrencyPipe,
    MiniMap
  ],
  templateUrl: './houses-page.html',
})
export class HousesPage { 
  // public searchControl = new FormControl('', { nonNullable: true });
  // public users$!: Observable<string[]>;

  // Instancia manual para el ejercicio (en la vida real se inyecta por dependencia)
  // private userService = new UserService();

  houses = signal<HouseProperty[]>([
    {
      id: uuid(),
      name: 'Villa Serenidad',
      description:
        'Un refugio tranquilo con vistas panorámicas al mar y jardines exuberantes.',
      price: 500_000,
      lngLat: { lng: -0.861526, lat: 41.65649 },
      tags: ['Villa', 'Mar', 'Jardines'],
    },
    {
      id: uuid(),
      name: 'Casa del Sol',
      description:
        'Una casa luminosa y acogedora con amplias terrazas y piscina privada.',
      price: 750_000,
      lngLat: { lng: -0.862, lat: 41.657 },
      tags: ['Casa', 'Sol', 'Terrazas'],
    },
    {
      id: uuid(),
      name: 'Residencia Esmeralda',
      description:
        'Elegante propiedad con acabados de lujo y un diseño arquitectónico moderno.',
      price: 1_200_000,
      lngLat: { lng: -0.863, lat: 41.658 },
      tags: ['Casa', 'Esmeralda', 'Acabados'],
    },
    {
      id: uuid(),
      name: 'Hacienda del Lago',
      description:
        'Encantadora hacienda con acceso directo al lago y un entorno natural impresionante.',
      price: 950_000,
      lngLat: { lng: -0.864, lat: 41.659 },
      tags: ['Casa', 'Lago', 'Hacienda'],
    },
  ]);


  ngOnInit() {
    // TU CÓDIGO TYPECRIPT AQUÍ
    // Requerimientos:
    // 1. Escuchar los cambios de searchControl.
    // 2. Esperar 300ms después de que el usuario deje de escribir.
    // 3. Ignorar la petición si el término de búsqueda es exactamente igual al anterior.
    // 4. Llamar a userService.searchUsers(term) cancelando peticiones anteriores en vuelo.
    // 5. Asignar el resultado al observable this.users$.

    // this.users$ = this.searchControl.valueChanges.pipe(
    //   debounceTime(300),
    //   distinctUntilChanged(),
    //   switchMap((term: string) => this.userService.searchUsers(term))
    // );
  }


}
