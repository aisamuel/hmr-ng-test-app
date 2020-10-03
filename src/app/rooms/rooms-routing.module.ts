import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomsComponent } from './rooms/rooms.component';
import { CustomersComponent } from './customers/customers.component';
import { BookComponent } from './book/book.component';
const routes: Routes = [
  {
    path: 'rooms',
    component: RoomsComponent
  },
  {
    path: 'customers',
    component: CustomersComponent
  },
  {
    path: 'books',
    component: BookComponent
  },
  {
    path: '',
    redirectTo: 'customers',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
