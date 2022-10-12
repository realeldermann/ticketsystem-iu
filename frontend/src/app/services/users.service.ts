import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  BASE_URL = 'http://massivebutdynamic.com:3123/';

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post(this.BASE_URL+'login', {
        email: email,
        password: password,
      }, {responseType: "text", observe: 'response', withCredentials: true} 
      ).subscribe({
        next: (result: any) => {
          if(result.status != 200) reject(result.error ?? '');
          resolve();
        }, 
        error: err => reject(err)
      });
    })
  }

  logout(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.get(this.BASE_URL+'logout', { headers: { session_id: this.getSessionId() } }).subscribe({
        next: (result: any) => {
          if(result.status != 200) reject(result.error ?? '');
          window.localStorage.removeItem('sessionToken');
          resolve();
        },
        error: err => reject(err)
      });
    })
  }

  getSessionId(): string {
    return window.localStorage.getItem('sessionToken') || '';
  }

  isLoggedIn(): boolean {
    return window.localStorage.getItem('sessionToken') !== null;
  }

  sessionExpired() {
    window.localStorage.removeItem('sessionToken');
    this.router.navigateByUrl('/login');
  }
}
