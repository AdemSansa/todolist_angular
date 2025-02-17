

import { Routes } from "@angular/router";
import { UsersListComponent } from "./users-list/users-list.component";
import { UsersAddComponent } from "./users-add/users-add.component";
import { UsersEditComponent } from "./users-list/components/users-edit/users-edit.component";
import { UsersDetailsComponent } from "./users-list/components/users-details/users-details.component";

export default [
    {path:'', component:UsersListComponent},
    {path:'add',component:UsersAddComponent},
    {path:':id',children:[
        {path:'',component:UsersDetailsComponent},
        {path:'edit',component:UsersEditComponent},
        
    ]}

] as Routes