import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { WebSocketService } from '../services/websocket.service';
import { Subscription } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import {
  IMessage,
  IServerMessage,
} from 'src/app/features/chat-room/models/message.interface';
import { MessageComponent } from './message/message.component';

@Component({
  selector: 'chat-room',
  standalone: true,
  imports: [
    CardModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    CommonModule,
    MessageComponent,
  ],
  templateUrl: 'chat-room.component.html',
  styleUrls: ['chat-room.component.css'],
})
export class ChatRoomComponent implements OnInit, OnDestroy {
  value: string = '';
  messages: IMessage[] = [];
  private wsSubscription?: Subscription;

  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  constructor(private wsService: WebSocketService) {}

  ngOnInit() {
    this.wsService.connect();
    this.wsSubscription = this.wsService.getMessages().subscribe(
      (message: IServerMessage) => {
        const parsedMessage: IMessage = JSON.parse(message.data);
        console.log(parsedMessage);
        this.messages.push(parsedMessage);
        this.scrollToBottom();
      },
      (error) => {
        console.error('WebSocket error:', error);
      }
    );
  }

  sendMessage() {
    if (this.value.trim()) {
      const messageObj: IMessage = {
        data: this.value,
        username: 'Your Username', // Replace with actual username
        timestamp: new Date().toLocaleTimeString(), // Format timestamp as needed
        userIcon: 'path/to/user/icon.png', // Replace with actual user icon URL
        isCurrentUser: true, // Set to true for the current user
      };
      this.wsService.sendMessage(messageObj);
      this.value = '';
    }
  }

  ngOnDestroy() {
    this.wsSubscription?.unsubscribe();
    this.wsService.closeConnection();
  }

  private scrollToBottom() {
    const container = this.messagesContainer.nativeElement;
    setTimeout(() => {
      container.scrollTop = container.scrollHeight;
    }, 100);
  }
}
