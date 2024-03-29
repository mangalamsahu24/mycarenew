import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Import the Router
import { AuthService } from '../../auth.service'; // Import the AuthService

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  onSubmit() {
    if (!this.email || !this.password ) {
      alert('Please fill in all fields.');
      return;
    }
  
    // Validate email format using a simple regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      alert('Please enter a valid email address.');
      return;
    }
    const loginData = {
      email: this.email,
      password: this.password,
    };
    this.http.post('http://localhost:3000/login', loginData)
    .subscribe((response: any) => {
      if (response.success) {
        console.log('Login successful:', response.message);
        alert('Login successful');
        // Redirect to the dashboard or home page
        this.authService.setSession(response.email);
        console.log(sessionStorage.getItem('email'));
        this.router.navigate(['../../admin']);
      } else {
        console.log('Login failed:', response.message);
        // Handle failed login
      }
    }, (error) => {
      console.error('Error during login:', error);
      // Handle login error
    });
  }
  }

