import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IListToDo } from '../models/IListToDo';
import { ApiService } from './api.service';
import { IToDo } from '../models/IToDo';
import { ICreateToDo } from '../models/ICreateToDo';
import { IUpdateToDo } from '../models/IUpdateToDo';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  list$ = new BehaviorSubject<IListToDo>([]);
  item$ = new BehaviorSubject<IToDo | null>(null);
  loading$ = new BehaviorSubject<boolean>(false);

  constructor(private api: ApiService) {}

  fetchList(params?: Partial<IToDo>): void {
    this.loadStart();
    this.api
      .fetchList(params)
      .pipe(
        finalize(() => {
          this.loadEnd();
        })
      )
      .subscribe(data => {
        this.list$.next(data);
      });
  }

  fetchItem(id: number): void {
    this.api.fetch(id).subscribe(data => {
      this.item$.next(data);
    });
  }

  create(item: ICreateToDo): Observable<void> {
    this.loadStart();

    return this.api.create(item).pipe(
      finalize(() => {
        this.loadEnd();
      })
    );
  }

  delete(id: number): Observable<void> {
    this.loadStart();

    return this.api.delete(id).pipe(
      finalize(() => {
        this.loadEnd();
      })
    );
  }

  update(item: IUpdateToDo, id: number): Observable<void> {
    this.loadStart();

    return this.api.update(item, id).pipe(
      finalize(() => {
        this.loadEnd();
      })
    );
  }

  clearItem(): void {
    this.item$.next(null);
  }

  private loadStart(): void {
    this.loading$.next(true);
  }

  private loadEnd(): void {
    this.loading$.next(false);
  }
}
