import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { CustomersService } from '../../customers.service';

@Component({
  selector: 'app-customers-delete',
  templateUrl: './customers-delete.component.html',
  styleUrls: ['./customers-delete.component.sass']
})
export class CustomersDeleteComponent {

  constructor(
    public dialogRef: MatDialogRef<CustomersDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public customersService: CustomersService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.customersService.deleteCustomers(this.data.id);
  }
}
