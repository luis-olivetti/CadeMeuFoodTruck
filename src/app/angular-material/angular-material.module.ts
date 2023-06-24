import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  exports: [
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatRadioModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatToolbarModule,
    MatSnackBarModule,
  ],
})
export class AngularMaterialModule {}
