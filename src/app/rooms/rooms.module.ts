import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsComponent } from './rooms/rooms.component';
import { CustomersComponent } from './customers/customers.component';
import { BookComponent } from './book/book.component';
import { DeleteDialogComponent } from './rooms/dialogs/delete/delete.component';
import { FormDialogComponent} from './rooms/dialogs/form-dialog/form-dialog.component';
import { CustomersDeleteComponent } from './customers/dialogs/customers-delete/customers-delete.component';
import {CustomersFormDialogComponent } from './customers/dialogs/customers-form-dialog/customers-form-dialog.component';
import { BookDeleteComponent } from './book/dialogs/book-delete/book-delete.component';
import { BookFormDialogComponent } from './book/dialogs/book-form-dialog/book-form-dialog.component';


@NgModule({
  declarations: [
    RoomsComponent,
    CustomersComponent,
    BookComponent,
    CustomersDeleteComponent,
    CustomersFormDialogComponent,
    DeleteDialogComponent,
    FormDialogComponent,
    BookDeleteComponent,
    BookFormDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatToolbarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatTabsModule,
    MatMenuModule,
    MaterialFileInputModule,
    RoomsRoutingModule
  ]
})
export class RoomsModule {}
