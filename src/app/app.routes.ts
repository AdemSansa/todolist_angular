import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';



export const routes: Routes = [
    
    {path:'users',loadChildren:()=>import('./modules/users/users.route')},
    {path:'features',loadChildren:()=>import('./modules/features/features.route')},
    {path:'groups',loadChildren:()=>import('./modules/groups/groups.route')},

    {path:'dashboard',component:DashboardComponent},
];
