import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusinessUnit } from '../models/business-unit.model';

@Injectable({
  providedIn: 'root'
})
export class BusinessUnitService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:5098/api/businessunit'; 

  getAll(): Observable<BusinessUnit[]> {
    return this.http.get<BusinessUnit[]>(this.apiUrl);
  }

  getById(id: number): Observable<BusinessUnit> {
    return this.http.get<BusinessUnit>(`${this.apiUrl}/${id}`);
  }

  create(unit: BusinessUnit): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(this.apiUrl, unit);
  }

  update(id: number, unit: BusinessUnit): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, unit);
  }
}