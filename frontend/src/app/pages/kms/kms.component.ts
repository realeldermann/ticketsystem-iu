import { Component, OnInit } from '@angular/core';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-kms',
  templateUrl: './kms.component.html',
  styleUrls: ['./kms.component.scss']
})
export class KmsComponent implements OnInit {

  allOwnCourseTickets: any = []
  constructor(private service: TicketsService) { }

  ngOnInit(): void {
    this.ownCourseTickets()
  }

  ownCourseTickets(): void {
    this.service
        .getOwnTickets()
        .subscribe((response: any) => {
          this.allOwnCourseTickets = response;
          console.log(response)
        });
  }
}
