import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-new-priority',
  templateUrl: './new-priority.component.html',
  styleUrls: ['./new-priority.component.scss']
})
export class NewPriorityComponent implements OnInit {

  ticket: any;
  priority = '';
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

  async newPriority() {
    console.log(this.priority);
    try {
      await this.tickets.newPriority(this.priority, this.id);
      this.router.navigateByUrl(`ticket/${this.id}`);
    } catch(err) {
      console.log('New Priority faild: ', err);
      if(typeof err === 'string') this.errorMsg = err;
    }
  }
}
