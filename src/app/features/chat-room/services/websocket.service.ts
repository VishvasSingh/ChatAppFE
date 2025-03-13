import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, Subject } from 'rxjs';
import { IMessage } from '../models/message.interface';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket$?: WebSocketSubject<any>;
  private messagesSubject = new Subject<any>();

  constructor() {}

  connect() {
    this.socket$ = webSocket('ws://localhost:8000/api/v1/chat/');
    this.socket$.subscribe(
      (message) => this.messagesSubject.next(message),
      (error) => console.error('WebSocket error:', error)
    );
  }

  sendMessage(message: IMessage) {
    if (this.socket$) {
      this.socket$.next(message);
    }
  }

  getMessages(): Observable<any> {
    return this.messagesSubject.asObservable();
  }

  closeConnection() {
    if (this.socket$) {
      this.socket$.complete();
    }
  }
}
