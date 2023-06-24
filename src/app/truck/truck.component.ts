import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';

@Component({
  selector: 'app-truck',
  templateUrl: './truck.component.html',
  styleUrls: ['./truck.component.css'],
})
export class TruckComponent implements OnInit {
  public truckForm: FormGroup;
  public apiLoaded: Observable<boolean>;

  public markerOptions: google.maps.MarkerOptions = { draggable: true };
  public markerPosition: google.maps.LatLngLiteral | null = null;

  public addMarker(event: google.maps.MapMouseEvent) {
    if (!event.latLng) {
      return;
    }

    this.markerPosition = event.latLng.toJSON();
  }

  public optionsMap: google.maps.MapOptions = {
    center: { lat: -23.426404, lng: -51.925083 },
    zoom: 15,
  };

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
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

    this.truckForm = this.formBuilder.group({
      name: '',
      address: '',
      phone: '',
      email: '',
      lat: '',
      lng: '',
      type: '',
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.truckForm.value);
  }
}
