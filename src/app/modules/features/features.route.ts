
import { Routes } from "@angular/router";

import { FeaturesAddComponent } from "./features-add/features-add.component";
import { FeaturesDetailsComponent } from "./features-list/components/features-details/features-details.component";
import { FeaturesEditComponent } from "./features-list/components/features-edit/features-edit.component";
import { FeaturesListComponent } from "./features-list/features-list.component";


export default [
    {path:'',component:FeaturesListComponent},
    {path:'add',component:FeaturesAddComponent},
    {path:':id',children:[
        {path:'',component:FeaturesDetailsComponent},
        {path:'edit',component:FeaturesEditComponent}
    ]}
] as Routes
