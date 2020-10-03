import { formatDate } from '@angular/common';
import {Customers} from '../customers/customers';
import {Rooms} from '../rooms/rooms';
export class Books {
  id: number;
  rooms: any;
  customers: any;
  no_of_nights: any;
  amount: any;
  booking_id: any;
  date: string;
  from: string;
  to: string;
  constructor(books) {
    {
      this.id = books.id || this.getRandomID();
      this.rooms = books.rooms || ''; 
      this.customers = books.customers || '';
      this.no_of_nights = books.no_of_nights || '';
      this.date = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.from = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.to = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.amount = books.amount || '';
      this.booking_id = books.booking_id || '';
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
