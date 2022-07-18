import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartsComponent } from './components/carts/carts.component';
import { CartsModule } from '../carts/carts.module';
import {MatDialogModule} from '@angular/material/dialog';
import { ViewDialogComponent } from './components/view-dialog/view-dialog.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    CartsComponent,
    ViewDialogComponent,
  ],
  imports: [
    CommonModule,
    CartsModule,
    MatDialogModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule
  ]
})
export class AdminModule { }
