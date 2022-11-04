import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.scss']
})
export class NewTicketComponent implements OnInit {

  title = '';
  status = '63153fb95867384124069430';
  priority = '';
  text = '';
  categorie = '';
  course = '630aa696e200f656d98e89d4';
  type = '';
  errorMsg: string = '';



  constructor(private router: Router, private ticketsService: TicketsService) { }

  ngOnInit(): void {
  }

  async newTicket() {
    console.log(this.title, this.status, this.categorie, this.priority, this.text, this.type, this.course);
    try {
      await this.ticketsService.newTicket(this.title, this.status, this.priority, this.text, this.categorie, this.course, this.type);
      this.router.navigateByUrl('kms');
    } catch(err) {
      console.log('New Ticket faild: ', err);
      if(typeof err === 'string') this.errorMsg = err;
    }
  }

}
