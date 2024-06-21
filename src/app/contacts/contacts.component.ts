import { Component, OnDestroy, OnInit } from '@angular/core';
import { AboutService } from '../services/about.service';
import { Comment } from '../shared/comment';
import { Router } from '@angular/router';
import { ContactService } from '../services/contact.service';
import { Contact } from '../shared/contact';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit,OnDestroy {

  contacts!: Contact[]
  errMsg!: string
  isWaiting: boolean = true;
  isWaitingDelete: boolean = false;
  // Shows admin functions if user has admin role
  showAdminFn = false;
  authUserSub!: Subscription; // Subscription to the authenticated user observable
  constructor(private router: Router,
    private contactService: ContactService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // this.contacts=this.contactService.getContacts();
    //Observer
    this.contactService.getContacts().subscribe(
      {
        next: (contacts: Contact[]) => { this.contacts = contacts; this.isWaiting = false; this.errMsg = "" },
        error: (err) => { this.contacts = [], this.isWaiting = false; this.errMsg = err }
      })

    // Subscribe to the AuthenticatedUser$ observable
    this.authUserSub=this.authService.AuthenticatedUser$.subscribe({
      next: user => {
        // If user is authenticated
        if (user) {
          // Show admin Fn if user has admin role
          this.showAdminFn = user.role.name === 'ROLE_ADMIN';
          console.log(this.showAdminFn);

        } else {
          this.showAdminFn = false;
        }
      }
    })
  }
  onDelete(id: number) {
    this.isWaitingDelete = true
    this.contactService.deleteContactById(id).subscribe(
      {
        next: (res: any) => {
          this.isWaitingDelete = false
          let index = this.contacts.findIndex(contact => contact.id === id);
          if (index != -1) {
            this.contacts.splice(index, 1);
          }
        }
      }
    );

  }
  onAbout() {
    //  window.location.href = 'https://www.google.tn/maps/@34.6113892,8.7590835,6z?hl=fr';
    this.router.navigate(['/about']);
    //this.router.navigateByUrl('/about?name=demo');
  }
  onAddContact() {
    this.router.navigateByUrl('/contacts/edit/-1')
  }
  ngOnDestroy(): void {
    // Unsubscribe from the AuthenticatedUser$ observable to prevent memory leaks
    this.authUserSub.unsubscribe();
   }
}
