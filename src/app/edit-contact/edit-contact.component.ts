import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../services/contact.service';
import { Contact } from '../shared/contact';
import { Observable } from 'rxjs';
import { FileUploadService } from '../services/file-upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  contact!: Contact;
  projectsContact!: String;
  //Variable to track loading state
  isLoading: boolean = false;
  //Variable for message duplicated email
  errMail: string="";
  /* upload file*/
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  constructor(private router: Router,
    private contactService: ContactService,
    private route: ActivatedRoute,
    private fileUploadService: FileUploadService,
    @Inject('BaseURL') public baseUrl: string) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      result => {
        let id = result.get('id');
        if (id != "-1") this.initContact(id);
       //  else this.contact = { "id": null, "name": "", "email": "", "website": "", "projects": [], "featured": false, "image": "images/default-avatar.jpg" }
        else this.contact = new Contact(null,[],false);
      }
    )
  }

  initContact(id:any) {
    this.contactService.getContactById(id)
      .subscribe(contact => {
        this.contact = contact,
          //Convertir  contact.projects en une chaine de caractères.
          this.projectsContact = contact.projects.join(",")
      });

  }
  onSubmit(/*form: NgForm*/) {

    /*let contact: Contact = {
      "id": null,
       "name": form.value["name"], 
       "email": form.value["email"], 
       "website":form.value["website"],
       "projects":form.value["projects"],
       "featured":false,
       "image":"images/default-avatar.jpg"

    }*/
    // this.contactService.addContact(this.contact)

    // Convertir projectsContact en tableau de chaine de caractères
    this.contact.projects = this.projectsContact.split(',').map(project => project.trim());
    this.isLoading = true; // Enable loading upon form submission
    if (this.contact.id == null) {
      this.contactService.addContact(this.contact)
        .subscribe({
          next: (contact: Contact) => {
                 this.errMail="";
                 this.upload(contact);
          },
          error: (err) => {
            this.errMail = err.message;
            this.isLoading = false; //Desactiver le spinner
          }
        })
    } else {
      this.contactService.updateContact(this.contact)
        .subscribe({
          next: (contact: Contact) => {
            this.errMail="";
            this.upload(contact);
          },
          error: (err) => {
            this.errMail = err.message;
            this.isLoading = false; //Desactiver le spinner
          }
        })
    };
    // this.router.navigateByUrl('/contacts');
  }
  onContacts() {
    this.router.navigateByUrl('/contacts');
  }

  /*upload file*/
  selectFile(event: any): void {
    // This function is called when a file is selected by the user
    // It assigns the selected file(s) to the selectedFiles property
    this.selectedFiles = event.target.files;
  }

  upload(contact: Contact): void {
    // This function uploads the selected file(s) to the server

    // Reset progress to 0 at the beginning of the upload
    this.progress = 0;

    // Check if there are selected files
    if (this.selectedFiles) {
      // Get the first selected file
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        // Assign the current file being uploaded
        this.currentFile = file;

        // Upload the file using the fileUploadService
        this.fileUploadService.upload(this.currentFile, contact.id).subscribe({
          next: (event: any) => {
            // Progress event: Update progress bar
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            }
            // Response event: Handle successful upload
            else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              // Redirect to contact details page after successful upload
              this.router.navigateByUrl('/contacts/' + contact.id);
              this.isLoading = false; //Desactiver le spinner
            }
          },
          error: (err: any) => {
            // Handle error
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
            this.currentFile = undefined;
          }
        });
      } else {
        // Reset selectedFiles if no file is selected
        this.selectedFiles = undefined;
        // Redirect to contact details page
        this.router.navigateByUrl('/contacts/' + contact.id);
        this.isLoading = false; //Desactiver le spinner
      }
    } else {
      // Redirect to contact details page 
      this.router.navigateByUrl('/contacts/' + contact.id);
      this.isLoading = false; //Desactiver le spinner
    }
  }
}
