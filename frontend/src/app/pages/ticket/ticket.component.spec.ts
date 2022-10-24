import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationExtras } from '@angular/router';

import { TicketComponent } from './ticket.component';

describe('TicketComponent', () => {
  let component: TicketComponent;
  let fixture: ComponentFixture<TicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

let ticketId

let navigationExtras: NavigationExtras = {
  queryParams: { 'session_id': ticketId },
  fragment: 'anchor'
};
