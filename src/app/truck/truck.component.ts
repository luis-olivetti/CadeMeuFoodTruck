import { HttpClient } from '@angular/common/http';
import { Component, ComponentRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { TruckService } from './service/truck.service';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../shared/snack-bar/snack-bar.component';

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

    this.truckForm.get('lat')?.setValue(this.markerPosition.lat);
    this.truckForm.get('lng')?.setValue(this.markerPosition.lng);
  }

  private durationInSeconds = 5;

  public optionsMap: google.maps.MapOptions = {
    center: { lat: -23.426404, lng: -51.925083 },
    zoom: 15,
  };

  private openSnackBar(message: string) {
    const snackBarRef: MatSnackBarRef<SnackBarComponent> =
      this.snackBar.openFromComponent(SnackBarComponent, {
        duration: this.durationInSeconds * 1000,
      });

    const snackBarComponent: SnackBarComponent = snackBarRef.instance;

    snackBarComponent.message = message;
  }

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private truckService: TruckService,
    private snackBar: MatSnackBar
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
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: [''],
      email: ['', [Validators.required, Validators.email]],
      lat: ['', Validators.required],
      lng: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  public onSubmit() {
    console.log(this.truckForm.value);

    if (this.truckForm.valid) {
      this.truckService.createTruck(this.truckForm.value).subscribe(
        () => {
          console.log('Truck created successfully');
          this.openSnackBar('Truck cadastrado!');
          this.truckForm.reset();

          Object.keys(this.truckForm.controls).forEach((key: string) => {
            const control = this.truckForm.get(key);
            control?.setValue(null);
          });
        },
        (error) => {
          console.error('Error creating truck:', error);
          this.openSnackBar('Ops, ocorreu uma falha ao cadastrar.');
        }
      );
    } else {
      this.openSnackBar('Por favor, preencha todos os campos obrigatórios.');
    }
  }
}
