import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { KmsComponent } from './pages/kms/kms.component';
import { TicketComponent } from './pages/ticket/ticket.component';
import { NewTicketComponent } from './pages/new-ticket/new-ticket.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CourseComponent } from './pages/course/course.component';
import { NewAnnotationComponent } from './pages/new-annotation/new-annotation.component';
import { NewStatusComponent } from './pages/new-status/new-status.component';
import { NewPriorityComponent } from './pages/new-priority/new-priority.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    KmsComponent,
    TicketComponent,
    NewTicketComponent,
    CourseComponent,
    NewAnnotationComponent,
    NewStatusComponent,
    NewPriorityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NoopAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
