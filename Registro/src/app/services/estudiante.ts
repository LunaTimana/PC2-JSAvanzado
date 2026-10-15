import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Estudiante {
  id: number;
  nombre: string;
  nota1: number;
  nota2: number;
  nota3: number;
}

@Injectable({ providedIn: 'root' })
export class EstudianteService {
  private readonly url = 'https://careli2021.github.io/api_examen/api/estudiante.json';

  constructor(private http: HttpClient) {}

  obtenerEstudiantes(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.url);
  }
}
