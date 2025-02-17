import {  Routes } from "@angular/router";
import { TasksListComponent } from "./tasks-list/tasks-list.component";
import { TasksAddComponent } from "./tasks-add/tasks-add.component";
import { TasksEditComponent } from "./tasks-list/components/tasks-edit/tasks-edit.component";
import { TasksDetailsComponent } from "./tasks-list/components/tasks-details/tasks-details.component";


export default [
    {path:'', component:TasksListComponent},
    {path:'add',component:TasksAddComponent},
    {path:':id',children:[
        {path:'',component:TasksDetailsComponent},
        {path:'edit',component:TasksEditComponent},
        
    ]}

] as Routes