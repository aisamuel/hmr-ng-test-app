import { formatDate } from '@angular/common';
import { Customers } from '../customers/customers';
export class Rooms {
  id: number;
  img: string;
  room_number: string;
  no_of_beds: any;
  room_type: string;
  floor: string;
  capacity: string;
  occupied: any;
  amount_per_night: any;
  // customer: Customers;
  // no_of_nights: any;
  // amount_per_night: any;
  constructor(room) {
    {
      this.id = room.id || this.getRandomID();
      this.img = room.avatar || 'assets/images/user/user1.jpg';
      this.room_number = room.room_number || '';
      this.no_of_beds = room.no_of_beds || '';
      this.room_type = room.room_type || '';
      this.floor = room.floor || '';
      this.capacity = room.capacity || '';
      // this.amount_per_night = room.amount_per_night || '';
      this.occupied = room.occupied || '';
      // this.customer = room.customer || '';
      // this.no_of_nights = room.no_of_night || '';
      this.amount_per_night = room.amount_per_night || '';
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}

