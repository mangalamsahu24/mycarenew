import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth.service'; // Import the AuthService


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent {

  constructor(private http: HttpClient, private authService: AuthService) { }

  onSubmit(form: NgForm) {
    // Check if form is valid
    if (form.invalid) {
      console.log('Form is invalid');
      return;
    }
    const email = this.authService.getEmail();
    if (!email) {
      console.error('Email not found in session');
      return; // Handle the case where email is null
    }
    
    // If email exists, proceed to send the form data to the server
    if (email) {
      const formData = { ...form.value }; // Add email to form data
      this.http.post('http://localhost:3000/appointments', formData)
        .subscribe(
          (response: any) => {
            console.log('Response:', response);
            alert('Appointments Request sent');
            window.location.reload();
            // Handle success response
          },
          (error) => {
            console.error('Error:', error);
            // Handle error response
          }
        );
    } else {
      console.error('Email not found in session');
    }
  }
}
