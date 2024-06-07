import { Injectable } from '@angular/core';
import { Contact } from '../shared/contact';
import { CONTACTS } from '../shared/contacts';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contacts: Contact[] = CONTACTS;

  constructor( private httpClient: HttpClient) { }

 /* getContacts(): Contact[] {
    return this.contacts;
  }*/
    getContacts(): Observable<Contact[]> {
      return this.httpClient.get<Contact[]>("http://localhost:3000/contacts") ;
    }
  getContactById(id: number): Contact | undefined {
    return this.contacts.find(contact => contact.id == id);
  }
  deleteContactById(id: number): void {
    let index = this.contacts.findIndex(contact => contact.id === id);
    if (index != -1) {
      this.contacts.splice(index, 1);
    }
  }
  addContact(contact:Contact){
      contact.id=this.contacts[(this.contacts.length-1)].id+1
      this.contacts.push(contact);
  }
}
