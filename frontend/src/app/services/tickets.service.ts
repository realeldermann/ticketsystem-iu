import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  BASE_URL = 'http://massivebutdynamic.com:3123/';

  constructor(private http: HttpClient, private router: Router) { }

  getOwnTickets() {
    return this.http.get(this.BASE_URL+'tickets/own/course', {withCredentials: true})
  }
}
