import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from './dialog/success-dialog/success-dialog.component';
@Component({
  selector: 'app-patient-create',
  templateUrl: './patient-create.component.html',
  styleUrls: ['./patient-create.component.scss']
})
export class PatientCreateComponent implements OnInit {

  register: FormGroup;
  hide = true;
  agree = false;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog,) {
    this.initForm();
  }
  initForm() {
    this.register = this._formBuilder.group({
      title: [''],
      surname: [''],
      first: [''],
      middle: [''],
      email: [''],
      address: [''],
      gender: [''],
      dob: [''],
      phone: [''],
      ethnicity: [''],
      religion: [''],
      marital: [''],
      occupation: [''],
      blood: [''],
      type: [''],
      nationality: [''],
      origin: [''],
      government: [''],
      residence: [''],
      nname: [''],
      relationship: [''],
      nphone: [''],
      naddress: [''],
      billing: ['']
    });
    // this.register = this._formBuilder.group({
    //   title: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
    //   surname: [''],
    //   first: ['', [Validators.required]],
    //   middle: ['', [Validators.required]],
    //   email: [
    //     '',
    //     [Validators.required, Validators.email, Validators.minLength(5)]
    //   ],
    //   address: [''],
    //   gender: ['', [Validators.required]],
    //   dob: ['', [Validators.required]],
    //   phone: ['', [Validators.required]],
    // });
  }
  onRegister() {
    console.log('Form Value', this.register.value);
  }
  success() {
    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      panelClass: 'custom-dialog-container',
      data: {
        action: 'add',
      },
    });
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      address: ['', Validators.required]
    });
  }


}
