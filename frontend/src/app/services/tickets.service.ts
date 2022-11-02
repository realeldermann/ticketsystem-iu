import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  BASE_URL = 'http://localhost:3123/';

  constructor(private http: HttpClient, private router: Router) { }

  getOwnTickets() {
    return this.http.get(this.BASE_URL+'tickets/own/course', {withCredentials: true})
  }

  getTicketById(_id: String) {
    return this.http.post(this.BASE_URL+'tickets/id/find', {_id: _id} ,{withCredentials: true})
  }

  

  newTicket(title: string, status: string, priority: string, text: string, categorie: string, course: string, type: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post(this.BASE_URL+'tickets', {
        title: title,
        status: status,
        priority: priority,
        text: text,
        categorie: categorie,
        course: course,
        annotation: null,
        type: type
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

  newAnnotation(text: string, _id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post(this.BASE_URL+'tickets/annotation', {
        _id: _id,
        text: text
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

  newStatus(status: string, _id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post(this.BASE_URL+'tickets/update/status', {
        _id: _id,
        status: status
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

  newPriority(priority: string, _id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post(this.BASE_URL+'tickets/update/priority', {
        _id: _id,
        priority: priority
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

}
