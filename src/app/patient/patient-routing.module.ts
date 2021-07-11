import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientCreateComponent } from './patient-create/patient-create.component';
import { PatientListComponent } from './patient-list/patient-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'patient-list',
    pathMatch: 'full'
  },
  {
    path: 'patient-list',
    component: PatientListComponent
  },
  {
    path: 'patient-create',
    component: PatientCreateComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
