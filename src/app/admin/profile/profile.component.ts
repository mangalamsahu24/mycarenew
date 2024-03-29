import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = {};

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.UserProfile();
  }

  UserProfile() {
    this.http.get<any>('http://localhost:3000/profile')
      .subscribe(
        (response) => {
          this.user = response;
        },
        (error) => {
          console.error('Error fetching user profile:', error);
        }
      );
  }

  saveProfile() {
    this.http.post<any>('http://localhost:3000/profile', this.user)
      .subscribe(
        (response) => {
          console.log('Profile saved successfully:', response);
        },
        (error) => {
          console.error('Error saving profile:', error);
        }
      );
  }

  // updateProfile() {
  //   this.http.put<any>('http://localhost:3000/profile', this.user)
  //     .subscribe(
  //       (response) => {
  //         console.log('Profile updated successfully:', response);
  //       },
  //       (error) => {
  //         console.error('Error updating profile:', error);
  //       }
  //     );
  // }

  // deleteProfile() {
  //   this.http.delete<any>('http://localhost:3000/profile')
  //     .subscribe(
  //       (response) => {
  //         console.log('Profile deleted successfully:', response);
  //         // Optionally, reset the user object or navigate to a different page
  //         this.user = {};
  //       },
  //       (error) => {
  //         console.error('Error deleting profile:', error);
  //       }
  //     );
  // }
}
