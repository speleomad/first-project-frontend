import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { authGuard } from './guards/auth.guard';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { SignupComponent } from './signup/signup.component';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
  {path:'',canActivate:[authGuard],data: {roles: ['ROLE_ADMIN','ROLE_USER']}, component:HomeComponent},  
  //{path:'about',canActivate:[authGuard],component:AboutComponent},
  {path:'about',canActivate: [authGuard],data: {roles: ['ROLE_ADMIN','ROLE_USER']},component:AboutComponent},
  //{path:'contacts',canActivate:[authGuard], component:ContactsComponent},
  {path:'contacts',canActivate:[authGuard], data: {roles: ['ROLE_ADMIN','ROLE_USER']}, component:ContactsComponent},
  {path:'contacts/edit/:id', canActivate:[authGuard], data: {roles: ['ROLE_ADMIN']},component:EditContactComponent },
  {path:'contacts/:id',canActivate:[authGuard],data: {roles: ['ROLE_ADMIN','ROLE_USER']}, component: ContactDetailComponent},
  {path:'admin', canActivate:[authGuard], data: {roles: ['ROLE_ADMIN']},component:AdminComponent},
  {path:'signin',component:SigninComponent},
  {path:'signup',component:SignupComponent},
  {path:"**",component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
