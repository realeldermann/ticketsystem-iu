import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { KmsComponent } from './pages/kms/kms.component';
import { LoginComponent } from './pages/login/login.component';
import { TicketComponent } from './pages/ticket/ticket.component';
import { NewTicketComponent } from './pages/new-ticket/new-ticket.component';
import { CourseComponent } from './pages/course/course.component';
import { NewAnnotationComponent } from './pages/new-annotation/new-annotation.component';
import { NewStatusComponent } from './pages/new-status/new-status.component';
import { NewPriorityComponent } from './pages/new-priority/new-priority.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'kms', component: KmsComponent},
  { path: 'ticket/:id', component: TicketComponent},
  { path: 'annotation/:id', component: NewAnnotationComponent},
  { path: 'status/:id', component: NewStatusComponent},
  { path: 'priority/:id', component: NewPriorityComponent},
  { path: 'newTicket', component: NewTicketComponent},
  { path: 'course', component: CourseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
