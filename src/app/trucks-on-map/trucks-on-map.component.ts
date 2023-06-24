import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { TrucksOnMapService } from './service/trucks-on-map.service';
import { Truck } from '../models/truck';

@Component({
  selector: 'app-trucks-on-map',
  templateUrl: './trucks-on-map.component.html',
  styleUrls: ['./trucks-on-map.component.css'],
})
export class TrucksOnMapComponent implements OnInit {
  public apiLoaded: Observable<boolean>;

  public optionsMap: google.maps.MapOptions = {
    center: { lat: -23.426404, lng: -51.925083 },
    zoom: 15,
  };

  public markerPositions: google.maps.LatLngLiteral[] = [];

  constructor(
    private httpClient: HttpClient,
    private trucksOnMapService: TrucksOnMapService
  ) {
    this.apiLoaded = httpClient
      .jsonp(
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyDzKJmQkpzAYMLTVEiJzXjmxyKjE5sZWhw',
        'callback'
      )
      .pipe(
        mapTo(true),
        catchError(() => of(false))
      );
  }

  ngOnInit(): void {
    this.getTrucks();
  }

  getTrucks(): void {
    this.trucksOnMapService.getTrucks().subscribe((trucks) => {
      this.markerPositions = trucks.map((truck) => ({
        lat: truck.lat,
        lng: truck.lng,
      }));
    });
  }
}
