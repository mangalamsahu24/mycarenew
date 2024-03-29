import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { MessageComponent } from './message/message.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', component: MainComponent },
      { path: 'Dashboard', component: MainComponent },
      { path: 'Appointment', component: AppointmentComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'doc', component: FileUploadComponent },
      { path: 'file-upload', component: FileUploadComponent },
      { path: 'message', component: MessageComponent },
      // { path: 'register', component: RegisterComponent },
      // // Add more nested routes as needed
    ]   
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
