import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { TruckService } from '../services/truck.service';

@Component({
  selector: 'app-trucks-on-map',
  templateUrl: './trucks-on-map.component.html',
  styleUrls: ['./trucks-on-map.component.css'],
})
export class TrucksOnMapComponent implements OnInit, OnDestroy {
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  public apiLoaded: Observable<boolean>;

  public optionsMap: google.maps.MapOptions = {
    center: { lat: -23.426404, lng: -51.925083 },
    zoom: 15,
  };

  public markerPositions: {
    position: google.maps.LatLngLiteral;
    name: string;
    address: string;
    email: string;
    phone: string;
    type: string;
  }[] = [];

  public handleMarkerClick(markerPosition: any): void {
    this.selectedMarker = markerPosition;
  }

  public selectedMarker!: {
    name: string;
    address: string;
    email: string;
    phone: string;
    type: string;
  };

  private trucksSubscription!: Subscription;

  constructor(
    private httpClient: HttpClient,
    private trucksService: TruckService
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
  ngOnDestroy(): void {
    this.trucksSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getTrucks();
  }

  private getTrucks(): void {
    this.trucksSubscription = this.trucksService
      .getTrucks()
      .subscribe((trucks) => {
        this.markerPositions = trucks.map((truck) => ({
          position: {
            lat: truck.lat,
            lng: truck.lng,
          },
          name: truck.name,
          address: truck.address,
          email: truck.email,
          phone: truck.phone,
          type: truck.type,
        }));
      });
  }
}
