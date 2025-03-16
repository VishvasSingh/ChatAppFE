import { Routes } from '@angular/router';
import { ChatRoomComponent } from './features/chat-room/components/chat-room.component';
import { HomeComponent } from './features/home/components/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'chat',
    component: ChatRoomComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
