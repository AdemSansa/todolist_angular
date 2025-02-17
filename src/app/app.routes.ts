import { Routes } from '@angular/router';



export const routes: Routes = [
    
    {path:'tasks',loadChildren:()=>import('./modules/tasks/tasks.route')},
    {path:'users',loadChildren:()=>import('./modules/users/users.route')},
    {path:'features',loadChildren:()=>import('./modules/features/features.route')}
];
