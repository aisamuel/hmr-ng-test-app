import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Rooms } from './rooms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  private readonly API_URL = 'assets/data/rooms.json';
  dataChange: BehaviorSubject<Rooms[]> = new BehaviorSubject<Rooms[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {}
  get data(): Rooms[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllRooms(): void {
    this.httpClient.get<Rooms[]>(this.API_URL).subscribe(
      data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  // DEMO ONLY, you can find working methods below
  addRooms(rooms: Rooms): void {
    this.dialogData = rooms;
  }
  updateRooms(rooms: Rooms): void {
    this.dialogData = rooms;
  }
  deleteRooms(id: number): void {
    console.log(id);
  }
}
