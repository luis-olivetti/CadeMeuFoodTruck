import { Component, OnDestroy, OnInit } from '@angular/core';
import { TruckService } from '../services/truck.service';
import { Truck } from '../models/truck';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../shared/snack-bar/snack-bar.component';

@Component({
  selector: 'app-truck-list',
  templateUrl: './truck-list.component.html',
  styleUrls: ['./truck-list.component.css'],
})
export class TruckListComponent implements OnInit, OnDestroy {
  private trucksSubscription!: Subscription;
  private durationInSeconds = 5;
  public trucks: Truck[] = [];
  public displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'phone',
    'type',
    'actions',
  ];

  constructor(
    private trucksService: TruckService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

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
        this.trucks = trucks;
      });
  }

  public editTruck(truck: Truck): void {
    // Implement the edit functionality
  }

  public deleteTruck(truck: Truck): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: 'Tem certeza de que deseja excluir este registro?',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.trucksService.deleteTruck(truck.id).subscribe(
          () => {
            this.openSnackBar('Truck excluído!');
            this.getTrucks();
          },
          (error) => {
            this.openSnackBar('Ops, ocorreu uma falha ao excluir.');
          }
        );
      }
    });
  }

  private openSnackBar(message: string) {
    const snackBarRef: MatSnackBarRef<SnackBarComponent> =
      this.snackBar.openFromComponent(SnackBarComponent, {
        duration: this.durationInSeconds * 1000,
      });

    const snackBarComponent: SnackBarComponent = snackBarRef.instance;

    snackBarComponent.message = message;
  }
}
