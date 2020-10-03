import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { RoomsService } from '../../rooms.service';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { Rooms } from '../../rooms';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass']
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  stdForm: FormGroup;
  rooms: Rooms;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public roomsService: RoomsService,
    private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.rooms.room_number;
      this.rooms = data.rooms;
    } else {
      this.dialogTitle = 'New Rooms';
      this.rooms = new Rooms({});
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
      id: [this.rooms.id],
      img: [this.rooms.img],
      capacity: [this.rooms.capacity],
      floor: [this.rooms.floor],
      no_of_beds: [this.rooms.no_of_beds],
      occupied: [this.rooms.occupied],
      room_number: [this.rooms.room_number],
      room_type: [this.rooms.room_type],
      amount_per_night: [this.rooms.amount_per_night]
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
    this.roomsService.addRooms(this.stdForm.getRawValue());
  }
}
