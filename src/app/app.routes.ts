import { Routes } from '@angular/router';
import { FullscreenMapPage } from './pages/fullscreen-map-page/fullscreen-map-page';
import { HousesPage } from './pages/houses-page/houses-page';
import { MarkersPage } from './pages/markers-page/markers-page';

export const routes: Routes = [
  {
    path: 'fullscreen',
    component: FullscreenMapPage,
    title: 'Fullscreen Map'
  },
  {
    path: 'markers',
    component: MarkersPage,
    title: 'Markers'
  },
  {
    path: 'houses',
    component: HousesPage,
    title: 'Houses Available'
  },
  {
    path: '**',
    redirectTo: 'fullscreen'
  }
];
