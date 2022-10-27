import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-new-status',
  templateUrl: './new-status.component.html',
  styleUrls: ['./new-status.component.scss']
})
export class NewStatusComponent implements OnInit {

  ticket: any;
  status = '';
  errorMsg: string = '';
  id: any;

  constructor(private route: ActivatedRoute, private tickets: TicketsService, private router: Router,) { 
    route.paramMap.subscribe(params => {
      this.id = params.get('id')
      console.log(this.id)
      tickets.getTicketById(this.id ?? '').subscribe(ticket => {
        console.log(ticket)
        this.ticket = ticket
      })
    })
  }

  ngOnInit(): void {
  }

  async newStatus() {
    console.log(this.status);
    try {
      await this.tickets.newStatus(this.status, this.id);
      this.router.navigateByUrl(`ticket/${this.id}`);
    } catch(err) {
      console.log('New Status faild: ', err);
      if(typeof err === 'string') this.errorMsg = err;
    }
  }
}
