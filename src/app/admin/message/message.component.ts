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

  constructor(private messageService: MessageService) {}
  sendMessage() {
    this.messageService.sendMessage(this.messageContent).subscribe(
      (response) => {
        console.log('Message sent successfully:', response);
        // Optionally, display a success message to the user
        this.messageContent = ''; // Clear the message input field after sending
      },
      (error) => {
        console.error('Error sending message:', error);
        // Optionally, display an error message to the user
      }
    );
  }
}
