import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { CustomersService } from '../../customers.service';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { Customers } from '../../customers';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-customers-form-dialog',
  templateUrl: './customers-form-dialog.component.html',
  styleUrls: ['./customers-form-dialog.component.sass']
})
export class CustomersFormDialogComponent {

  action: string;
  dialogTitle: string;
  stdForm: FormGroup;
  customers: Customers;
  constructor(
    public dialogRef: MatDialogRef<CustomersFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public customersService: CustomersService,
    private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.customers.name;
      this.customers = data.customers;
    } else {
      this.dialogTitle = 'New Customer';
      this.customers = new Customers({});
    }
    this.stdForm = this.createContactForm();
  }
  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.customers.id],
      img: [this.customers.img],
      name: [this.customers.name],
      address: [this.customers.address],
      email: [
        this.customers.email,
        [Validators.required, Validators.email, Validators.minLength(5)]
        ],
      mobile: [this.customers.mobile],
      // email: [
      //   this.students.email,
      //   [Validators.required, Validators.email, Validators.minLength(5)]
      // ],
      // date: [
      //   formatDate(this.students.date, 'yyyy-MM-dd', 'en'),
      //   [Validators.required]
      // ],
      
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.customersService.addCustomers(this.stdForm.getRawValue());
  }

}
