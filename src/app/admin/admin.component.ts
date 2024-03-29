import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Import the AuthService
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  email: string | null = null; // Initialize email property
  status = false;
  addToggle()
  {
    this.status = !this.status;       
  }
  constructor(private authService: AuthService, private router: Router) {

    console.log(sessionStorage.getItem('email'));

    // Redirect to login if user is not logged in
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['./home/login']);
    }
  }
  ngOnInit(): void {
    this.email = this.authService.getEmail(); // Retrieve email from AuthService
    console.log(this.email); // Check if email is correctly retrieved
  }
  logout(): void {
    // Call logout method from AuthService
    this.authService.logout();
    // Redirect to login page
    this.router.navigate(['../']);
  }
}
