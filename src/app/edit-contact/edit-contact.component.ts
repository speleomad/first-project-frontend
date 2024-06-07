import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Contact } from '../shared/contact';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  
  constructor( private router:Router,
               private contactService:ContactService){}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
  onSubmit(form:NgForm){
      console.log(form.value)
      let contact:Contact={
        id:-1,
        //name:form.value['name']
        name:form.value.name,
        email:form.value.email,
        website:form.value.website,
        projects:[form.value.projects],
        featured:false,
        image:'../../assets/images/default-avatar.jpg'       
      }

     this.contactService.addContact(contact);
     this.router.navigateByUrl("/contacts");
  }
  onContacts(){
   this.router.navigateByUrl('/contacts')
  }


}
