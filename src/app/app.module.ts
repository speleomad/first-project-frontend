import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { GetCharPipe } from './pipes/get-char.pipe';
import { CommentComponent } from './comment/comment.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { BaseURL } from './shared/baseurl';
import { ContactService } from './services/contact.service';
import { AboutService } from './services/about.service';
import { SignupComponent } from './signup/signup.component';
import { AdminComponent } from './admin/admin.component';
import { HttpInterceptor } from './services/http.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactsComponent,
    GetCharPipe,
    CommentComponent,
    HomeComponent,
    SigninComponent,
    NotFoundComponent,
    ContactDetailComponent,
    EditContactComponent,
    SignupComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptor, multi: true },
    { provide: 'BaseURL', useValue: BaseURL}
 ],

  bootstrap: [AppComponent]
})
export class AppModule { }
