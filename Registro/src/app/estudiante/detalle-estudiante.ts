import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Estudiante, EstudianteService } from '../services/estudiante';

@Component({
  selector: 'app-detalle-estudiante',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle-estudiante.html'
})
export class DetalleEstudiante implements OnInit {
  readonly estudiante = signal<Estudiante | null>(null);
  readonly cargando = signal(true);
  readonly error = signal('');
  readonly promedio = computed(() => {
    const estudiante = this.estudiante();
    return estudiante
      ? (estudiante.nota1 + estudiante.nota2 + estudiante.nota3) / 3
      : null;
  });
  readonly estado = computed(() => {
    const promedio = this.promedio();
    return promedio !== null && promedio >= 13 ? 'Aprobado' : 'Desaprobado';
  });
  readonly observacion = computed(() => {
    const promedio = this.promedio();
    if (promedio === null) return '';
    if (promedio >= 17) return 'Excelente';
    if (promedio >= 13 && promedio < 17) return 'Regular';
    if (promedio < 13) return 'En riesgo';
    return 'Debe reforzar sus notas';
  });

  constructor(
    private route: ActivatedRoute,
    private servicio: EstudianteService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    if (!idParam || !Number.isInteger(id)) {
      this.error.set('El identificador del estudiante no es válido.');
      this.cargando.set(false);
      return;
    }

    this.servicio.obtenerEstudiantes().subscribe({
      next: estudiantes => {
        const estudiante = estudiantes.find(item => item.id === id);
        if (!estudiante) {
          this.error.set('No se encontró el estudiante solicitado.');
        } else {
          this.estudiante.set(estudiante);
        }
        this.cargando.set(false);
      },
      error: error => {
        console.error('Error al obtener el detalle del estudiante:', error);
        this.error.set('No se pudo obtener el detalle del estudiante.');
        this.cargando.set(false);
      }
    });
  }
}
