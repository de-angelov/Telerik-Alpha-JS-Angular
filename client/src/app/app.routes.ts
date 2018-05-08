import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { HomeComponent } from './components/public/home/home.component';
import { JobListComponent } from './components/public/job/job.list/job.list.component';
import { JobDetailsComponent } from './components/public/job/job.details/job.details.component';
import { ContactsComponent } from './components/public/contacts/contacts.component';
import { AdminAplicationsComponent } from './components/admin/admin.aplications/admin.aplications.component';
import { AdminJobComponent } from './components/admin/admin.job/admin.job.component';
import { AdminUsersComponent } from './components/admin/admin.user/admin.user.component';
import { AdminLinksComponent } from './components/admin/admin.links/admin.links.component';
import { AdminContactsComponent } from './components/admin/admin.contacts/admin.contacts.component';

//TO DO create components
export const ROUTES: Routes = [
    {path:'home', component: HomeComponent },
    {path:'', redirectTo: 'home', pathMatch: 'full'},
    {path:'job', children: [
        {path: '', component: JobListComponent },
        {path: ':id', component: JobDetailsComponent}
    ]}, // children
    {path:'contacts' , component: ContactsComponent},
    {path:'admin', children: [
        { path:'applications', component: AdminAplicationsComponent },
        { path:'jobs', component: AdminJobComponent },
        { path:'users', component: AdminUsersComponent },
        { path:'links', component: AdminLinksComponent },
        { path:'contacts', component: AdminContactsComponent }, 
    ] },
    { path:'**', redirectTo:'home'},
];