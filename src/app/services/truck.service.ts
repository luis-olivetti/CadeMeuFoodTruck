import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Truck } from '../models/truck';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TruckService {
  private apiUrl = 'http://localhost:3000/trucksOnMap';

  constructor(private http: HttpClient) {}

  public getTrucks(): Observable<Truck[]> {
    return this.http
      .get<Truck[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  public createTruck(truck: Truck): Observable<any> {
    return this.http
      .post(this.apiUrl, truck)
      .pipe(catchError(this.handleError));
  }

  public updateTruck(truck: Truck): Observable<any> {
    const url = `${this.apiUrl}/${truck.id}`;
    return this.http.put(url, truck).pipe(catchError(this.handleError));
  }

  public deleteTruck(truckId: number): Observable<any> {
    const url = `${this.apiUrl}/${truckId}`;
    return this.http.delete(url).pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong. Please try again later.');
  }
}
