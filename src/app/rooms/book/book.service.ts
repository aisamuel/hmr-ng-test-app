import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Books} from './book';
import {Customers} from '../customers/customers';
import { Rooms } from '../rooms/rooms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BookService {

  private readonly API_URL = 'assets/data/books.json';
  dataChange: BehaviorSubject<Books[]> = new BehaviorSubject<Books[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {}
  get data(): Books[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllBooks(): void {
    this.httpClient.get<Books[]>(this.API_URL).subscribe(
      data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  getAllCustomers(): Observable<Customers[]> {
    const url = 'assets/data/customers.json';
    return this.httpClient.request<Customers[]>('GET', url);
  }
  // getAllCustomers(): void {
  //   this.httpClient.get<Customers[]>(this.API_URL).subscribe(
  //     data => {
  //       this.dataChange.next(data);
  //     },
  //     (error: HttpErrorResponse) => {
  //       console.log(error.name + ' ' + error.message);
  //     }
  //   );
  // }
  getAllRooms(): Observable<Rooms[]> {
    const url = 'assets/data/rooms.json';
    return this.httpClient.request<Rooms[]>('GET', url);
  }

  // DEMO ONLY, you can find working methods below
  addBooks(books: Books): void {
    this.dialogData = books;
  }
  updateBooks(books: Books): void {
    this.dialogData = books;
  }
  deleteBooks(id: number): void {
    console.log(id);
  }
}
