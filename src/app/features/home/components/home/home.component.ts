import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClient } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { LoginGetResponse, LoginPostResponse } from '../../models/login.interface';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardModule,
    InputTextModule,
    FormsModule,
    CommonModule,
    ButtonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  username: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const apiUrl = 'http://localhost:8000/api/v1/login';
    const payload = { user_name: this.username };
    this.http.post<LoginPostResponse>(apiUrl, payload).subscribe(
      (response: LoginPostResponse) => {
        localStorage.setItem('jwtToken', response.access_token);

        // Make your GET call - token will be automatically added
        this.http
          .get<LoginGetResponse>('http://localhost:8000/api/v1/login')
          .subscribe(
            (data: LoginGetResponse) => 
              {
                console.log('Protected data:', data);
                localStorage.setItem('userName', data.user_name);
                localStorage.setItem('userId', data.user_id);
                this.router.navigate(['/chat']);
              },
            (error) => console.error('Error:', error)
          );
      },
      (error) => console.error('Error during API call:', error)
    );
  }
}
