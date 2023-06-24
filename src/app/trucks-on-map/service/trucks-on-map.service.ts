import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Truck } from 'src/app/models/truck';

@Injectable({
  providedIn: 'root',
})
export class TrucksOnMapService {
  private apiUrl = 'http://localhost:3000/trucksOnMap';

  constructor(private http: HttpClient) {}

  getTrucks(): Observable<Truck[]> {
    return this.http
      .get<Truck[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong. Please try again later.');
  }
}
