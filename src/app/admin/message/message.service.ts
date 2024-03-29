// message.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private http: HttpClient) {}

  sendMessage(messageContent: string) {
    const messageData = {
      content: messageContent
    };
    return this.http.post('http://localhost:3000/send-message', messageData);
  }
}
