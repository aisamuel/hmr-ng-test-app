export class Patient {
  id: number;
  img: string;
  name: string;
  gender: string;
  age: string;
  phone: string;
  address: string;
  constructor(patient) {
    {
      this.id = patient.id || this.getRandomID();
      this.img = patient.avatar || 'assets/images/user/user1.jpg';
      this.name = patient.name || '';
      this.gender = patient.gender || '';
      this.age = patient.age || '';
      this.phone = patient.phone || '';
      this.address = patient.address || '';
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
