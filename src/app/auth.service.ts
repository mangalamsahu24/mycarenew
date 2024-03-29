import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private email: string | null = null; // Initialize email as null

  constructor() { }

  setSession(email: string): void {
    sessionStorage.setItem('email', email); // Store user email in session storage
    this.email = email; // Update email in AuthService
  }

  getEmail(): string | null {
    if (!this.email) {
      this.email = sessionStorage.getItem('email');
    }
    return this.email; // Return email from AuthService
  }
  // isLoggedIn(): boolean {
  //   return !!sessionStorage.getItem('email'); // Check if user email exists in session storage
  // }
  isLoggedIn(): boolean {
    return !!this.getEmail(); // Check if user email exists in session storage
  }
  
  logout(): void {
    sessionStorage.removeItem('email'); // Remove user email from session storage
    this.email = null; // Reset email in AuthService
  }
}

