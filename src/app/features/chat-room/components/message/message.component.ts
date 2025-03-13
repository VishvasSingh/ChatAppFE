import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMessage } from '../../models/message.interface';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  @Input() message!: IMessage;
  // Input property for message data

  ngOnInit(): void {
    // This method is called when the component is initialized
    console.log(this.message)
  }
}
