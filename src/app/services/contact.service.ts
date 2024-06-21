import { Inject, Injectable } from '@angular/core';
import { Contact } from '../shared/contact';
import { CONTACTS } from '../shared/contacts';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { ProcessHttpmsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = CONTACTS
  httpOptions={
    headers:new HttpHeaders({'Content-Type':'application/json'}),
    withCredentials: true
  };
  constructor(private http: HttpClient,  @Inject('BaseURL')private baseUrl:string,
              private processHTTPMsgService : ProcessHttpmsgService ) { }
 
  getContacts(): Observable<Contact[]> {
    //return this.contacts;
  return  this.http.get<Contact[]>(this.baseUrl+"contacts",{ withCredentials: true})
                  .pipe(catchError(this.processHTTPMsgService.handleError));
            
  }

  getContactById(id: number): Observable<Contact> {
   // return this.contacts.find(contact => contact.id == id);
   return this.http.get<Contact>(this.baseUrl+"contacts/"+id,{ withCredentials: true});
  }
  deleteContactById(id: number): Observable<void> {
     return this.http.delete<void>(this.baseUrl+"contacts/"+id,{ withCredentials: true});

   /* let index = this.contacts.findIndex(contact => contact.id == id)
    this.contacts.splice(index, 1);*/
  }
  addContact(contact: Contact): Observable<Contact> {
  /*  contact.id = this.contacts[this.contacts.length - 1].id + 1;
    this.contacts.push(contact);*/
   
    return this.http.post<Contact>(this.baseUrl+"contacts",contact,this.httpOptions);
  }
  updateContact(contact: Contact):Observable<Contact>{
    return this.http.put<Contact>(this.baseUrl+"contacts/"+contact.id,contact,this.httpOptions)
  }
}

