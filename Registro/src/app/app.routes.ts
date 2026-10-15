import { Routes } from '@angular/router';
import { Estudiante } from './estudiante/estudiante';
import { DetalleEstudiante } from './estudiante/detalle-estudiante';

export const routes: Routes = [
  { path: 'productos/:id', component: DetalleEstudiante },
  { path: 'productos', component: Estudiante },
  { path: '', redirectTo: 'productos', pathMatch: 'full' }
];