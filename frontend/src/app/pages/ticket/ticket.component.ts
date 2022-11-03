import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketsService } from 'src/app/services/tickets.service';


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
ticket: any;

  constructor(private route: ActivatedRoute, private tickets: TicketsService) { 
    route.paramMap.subscribe(params => {
      let id = params.get('id')
      console.log(id)
      tickets.getTicketById(id ?? '').subscribe(ticket => {
        console.log(ticket)
        this.ticket = ticket
    })
  })
  }

  ngOnInit(): void {
  }

}
