// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentComponent } from './admin/appointment/appointment.component';
import { FileUploadComponent } from './admin/file-upload/file-upload.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'appointment', component: AppointmentComponent },

  { path: 'admin', loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule) },
  { path: 'uploads/:id', component: FileUploadComponent }, // Adjust for your use case
  { path: 'home', loadChildren: () => import('./home/home-routing.module').then(m => m.HomeRoutingModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
