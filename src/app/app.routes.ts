import { Routes } from '@angular/router';
import { ChatRoomComponent } from './features/chat-room/components/chat-room.component';

export const routes: Routes = [
    {
        path: '',
        component: ChatRoomComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
