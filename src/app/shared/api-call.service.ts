import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Item } from './item';

@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  constructor(private http: HttpClient) {}

  fetchItems(): Observable<Item[]> {
    return throwError('Not Implemented');
  }
}
