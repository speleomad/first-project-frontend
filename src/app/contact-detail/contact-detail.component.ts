import { Component, OnInit } from '@angular/core';
import { Contact } from '../shared/contact';
import { ContactService } from '../services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {

  contact:Contact|undefined;
  idContact:any;
  constructor(private contactService: ContactService,
              private route: ActivatedRoute,
              private router:Router){}
  
  ngOnInit(): void {
    //snapshot
    //this.idContact=this.route.snapshot.params['id'];
    //Asynchrone avec RxJS
    this.route.paramMap.subscribe(
      res=>{this.idContact=res.get('id');
      this.contact=this.contactService.getContactById(this.idContact);
      }
    )
   
  }

  goToContacts(){
    this.router.navigateByUrl("/contacts")
  }
  

}
