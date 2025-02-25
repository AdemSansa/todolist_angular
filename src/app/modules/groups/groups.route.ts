
import { Routes } from "@angular/router";

import { GroupsAddComponent } from "./groups-add/groups-add.component";
import { GroupsDetailsComponent } from "./groups-list/components/groups-details/groups-details.component";
import { GroupsEditComponent } from "./groups-list/components/groups-edit/groups-edit.component";
import { GroupsListComponent } from "./groups-list/groups-list.component";


export default [
    {path:'',component:GroupsListComponent},
    {path:'add',component:GroupsAddComponent},
    {path:':id',children:[
        {path:'',component:GroupsDetailsComponent},
        {path:'edit',component:GroupsEditComponent}
    ]}
] as Routes
