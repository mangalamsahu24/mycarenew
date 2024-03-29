import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  appointments: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments(): void {
    this.http.get<any[]>('http://localhost:3000/appointments')
      .subscribe(
        (response) => {
          this.appointments = response;
        },
        (error) => {
          console.error('Error fetching appointments:', error);
        }
      );
  }
}
