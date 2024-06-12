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
  contacts!:Contact[]
  errMsg!:string
  isWaiting:boolean=true;
  isWaitingDelete:boolean=false;
  constructor(private router:Router,private contactService:ContactService){}
  ngOnInit(): void {
  // this.contacts=this.contactService.getContacts();
   //Observer
  this.contactService.getContacts().subscribe(
    {
      next:(contacts:Contact[])=>{this.contacts=contacts;this.isWaiting=false; this.errMsg=""},
      error:(err)=>{this.contacts=[],this.isWaiting=false; this.errMsg=err}
    }
  )
  }
  onDelete(id:number){
    this.isWaitingDelete=true
    this.contactService.deleteContactById(id).subscribe(
      {
        next:(res:any)=>{  
          this.isWaitingDelete=false
          let index = this.contacts.findIndex(contact => contact.id === id);
          if (index != -1) {
            this.contacts.splice(index, 1);
          }}
      }
    );

  }
  onAbout(){
  //  window.location.href = 'https://www.google.tn/maps/@34.6113892,8.7590835,6z?hl=fr';
    this.router.navigate(['/about']);
  //this.router.navigateByUrl('/about?name=demo');
  }
  onAddContact(){
    this.router.navigateByUrl('/contacts/edit/-1')
  }
}
