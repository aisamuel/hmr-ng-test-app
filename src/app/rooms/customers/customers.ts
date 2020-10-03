import {Rooms} from '../rooms/rooms'
export class Customers {
    id: number;
    img: string;
    name: string;
    email: string;
    mobile: string;
    address: string;
    
    constructor(customers) {
      {
        this.id = customers.id || this.getRandomID();
        this.img = customers.avatar || 'assets/images/user/user1.jpg';
        this.name = customers.name || '';
        this.email = customers.email || '';
        this.mobile = customers.mobile || '';
        this.address = customers.address || '';
      }
    }
    public getRandomID(): string {
      const S4 = () => {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return S4() + S4();
    }
  }
  
