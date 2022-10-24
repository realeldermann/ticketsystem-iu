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

  getTicketById(_id: String) {
    return this.http.post(this.BASE_URL+'tickets/id/find', {_id: _id} ,{withCredentials: true})
  }

  newTicket(title: String, text: String, type: String, categorie: String, priority: String, status: String) {
    return this.http.post(this.BASE_URL+'tickets', {title: title, text: text, type: type, categorie: categorie, priority: priority, status: status } ,{withCredentials: true})
  }
}
