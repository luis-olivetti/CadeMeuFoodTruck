import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Truck } from 'src/app/models/truck';

@Injectable({
  providedIn: 'root',
})
export class TrucksOnMapService {
  private apiUrl = 'http://localhost:3000/trucksOnMap';

  constructor(private http: HttpClient) {}

  getTrucks(): Observable<Truck[]> {
    return this.http.get<Truck[]>(this.apiUrl);
  }
}
