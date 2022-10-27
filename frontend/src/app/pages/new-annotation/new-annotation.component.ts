import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-new-annotation',
  templateUrl: './new-annotation.component.html',
  styleUrls: ['./new-annotation.component.scss']
})
export class NewAnnotationComponent implements OnInit {
  ticket: any;
  text = '';
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

  async newAnnotation() {
    console.log(this.text);
    try {
      await this.tickets.newAnnotation(this.text, this.id);
      this.router.navigateByUrl(`ticket/${this.id}`);
    } catch(err) {
      console.log('New Annotation faild: ', err);
      if(typeof err === 'string') this.errorMsg = err;
    }
  }

}
