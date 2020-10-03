import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { BookService } from '../../book.service';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { Customers } from '../../../customers/customers';
import { Rooms } from '../../../rooms/rooms';
import { Books } from '../../book';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-book-form-dialog',
  templateUrl: './book-form-dialog.component.html',
  styleUrls: ['./book-form-dialog.component.sass']
})
export class BookFormDialogComponent implements OnInit {

  action: string;
  dialogTitle: string;
  stdForm: FormGroup;
  books: Books;
  rooms: Rooms[];
  customers: Customers[];
  constructor(
    public dialogRef: MatDialogRef<BookFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public bookService: BookService,
    private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    this.loadCustomersData();
    this.loadRoomsData();
    if (this.action === 'edit') {
      this.dialogTitle = data.books.booking_id;
      this.books = data.books;
    } else {
      this.dialogTitle = 'Booking';
      this.books = new Books({});
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

  id: number;
  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.books.id],
      rooms: [this.books.rooms],
      customers: [this.books.customers],
      no_of_nights: [this.books.no_of_nights],
      amount: [this.books.amount, {disabled:true}],
      date: [
        formatDate(this.books.date, 'yyyy-MM-dd', 'en'),
        
      ],
      from: [
        formatDate(this.books.from, 'yyyy-MM-dd', 'en'),
        [Validators.required]
      ],
      to: [
        formatDate(this.books.to, 'yyyy-MM-dd', 'en'),
        [Validators.required]
      ],
      
    });
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
  submit() {
    // emppty stuff
  }
  amount() {
    // console.log(this.rooms);
    this.stdForm.controls.amount.setValue(this.rooms[this.stdForm.value.rooms].amount_per_night * this.stdForm.value.no_of_nights);
    console.log(this.stdForm.value.amount);
    console.log(this.rooms[0].amount_per_night * this.stdForm.value.no_of_nights);
    this.stdForm.value.booking_id = this.getRandomID();

    console.log("amout working");
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    
    this.bookService.addBooks(this.stdForm.getRawValue());
  }

  

  loadCustomersData(){
    this.bookService.getAllCustomers()
     .subscribe(
       (response) => {
         this.customers = response;
         console.log(response);
         console.log("get customers working");
        //  this.getParentProfile();

       }, (error) => {
         console.error(error);
         console.log("get customers not working")

       }
     );
  }
  loadRoomsData(){
    this.bookService.getAllRooms()
     .subscribe(
       (response) => {
         this.rooms = response;
         console.log(response);
         console.log("get rooms working");
        //  this.getParentProfile();

       }, (error) => {
         console.error(error);
         console.log("get rooms not working")

       }
     );
  }

  ngOnInit( ) {}


}
