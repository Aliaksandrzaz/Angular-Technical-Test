import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IListToDo } from '../models/IListToDo';
import { IToDo } from '../models/IToDo';
import { BASE_URL } from '../../app.module';
import { IUpdateToDo } from '../models/IUpdateToDo';
import { ICreateToDo } from '../models/ICreateToDo';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, @Inject(BASE_URL) private apiUrl: string) {}

  fetchList(params?: Partial<IToDo>): Observable<IListToDo> {
    return this.http.get<IListToDo>(`${this.apiUrl}/tasks`, {
      params,
    });
  }

  fetch(id: number): Observable<IToDo> {
    return this.http.get<IToDo>(`${this.apiUrl}/tasks/${id}`);
  }

  create(body: ICreateToDo): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/tasks`, body);
  }

  update(body: IUpdateToDo, id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/tasks/${id}`, body);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tasks/${id}`);
  }
}
