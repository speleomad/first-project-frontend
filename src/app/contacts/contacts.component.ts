import { Component, OnInit } from '@angular/core';
import { AboutService } from '../services/about.service';
import { Comment } from '../shared/comment';
import { Router } from '@angular/router';
import { ContactService } from '../services/contact.service';
import { Contact } from '../shared/contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit{
  contacts:Contact[]=[]
  constructor(private router:Router,private contactService:ContactService){}
  ngOnInit(): void {
  // this.contacts=this.contactService.getContacts();
   //Observer
  this.contactService.getContacts().subscribe(
    {
      next:(contacts:Contact[])=>{this.contacts=contacts}
    }
  )
  }
  onDelete(id:number){
    
    this.contactService.deleteContactById(id);

  }
  onAbout(){
  //  window.location.href = 'https://www.google.tn/maps/@34.6113892,8.7590835,6z?hl=fr';
    this.router.navigate(['/about']);
  //this.router.navigateByUrl('/about?name=demo');
  }
  onAddContact(){
    this.router.navigateByUrl('/contacts/edit')
  }
}
