import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Customers } from './customers';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private readonly API_URL = 'assets/data/customers.json';
  dataChange: BehaviorSubject<Customers[]> = new BehaviorSubject<Customers[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {}
  get data(): Customers[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllCustomers(): void {
    this.httpClient.get<Customers[]>(this.API_URL).subscribe(
      data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  // DEMO ONLY, you can find working methods below
  addCustomers(customers: Customers): void {
    this.dialogData = customers;
  }
  updateCustomers(customers: Customers): void {
    this.dialogData = customers;
  }
  deleteCustomers(id: number): void {
    console.log(id);
  }
}
