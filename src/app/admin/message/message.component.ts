// message.component.ts
import { Component } from '@angular/core';
import { MessageService } from './message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  
  messageContent: string = '';
  sentMessages: string[] = []; // Array to store sent messages

  constructor(private messageService: MessageService) {}

  sendMessage() {
    this.messageService.sendMessage(this.messageContent).subscribe(
      (response) => {
        console.log('Message sent successfully:', response);
        // Add the sent message to the array
        this.sentMessages.push(this.messageContent);
        // Clear the message input field after sending
        this.messageContent = '';
      },
      (error) => {
        console.error('Error sending message:', error);
        // Optionally, display an error message to the user
      }
    );
  }
}
