import { LOCALE_ID, NgModule } from '@angular/core';
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
import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { CourseComponent } from './pages/course/course.component';
import { NewAnnotationComponent } from './pages/new-annotation/new-annotation.component';
import { NewStatusComponent } from './pages/new-status/new-status.component';
import { NewPriorityComponent } from './pages/new-priority/new-priority.component';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeDe, localeDeExtra);

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
  providers: [
    { provide: LOCALE_ID, useValue: 'de' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
