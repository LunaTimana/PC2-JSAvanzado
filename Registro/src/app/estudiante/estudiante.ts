import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Estudiante as EstudianteModel, EstudianteService } from '../services/estudiante';

@Component({
  selector: 'app-estudiante',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './estudiante.html'
})
export class Estudiante implements OnInit {
  readonly estudiantes = signal<EstudianteModel[]>([]);
  readonly cargando = signal(true);
  readonly error = signal('');

  constructor(private servicio: EstudianteService) {}

  ngOnInit(): void {
    this.cargarEstudiantes();
  }

  cargarEstudiantes(): void {
    this.cargando.set(true);
    this.error.set('');
    this.servicio.obtenerEstudiantes().subscribe({
      next: datos => {
        this.estudiantes.set(datos);
        this.cargando.set(false);
      },
      error: error => {
        console.error('Error al obtener los estudiantes:', error);
        this.error.set('No se pudieron obtener los estudiantes.');
        this.cargando.set(false);
      }
    });
  }
}