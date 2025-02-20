import { Routes } from '@angular/router';



export const routes: Routes = [
    
    {path:'users',loadChildren:()=>import('./modules/users/users.route')},
    {path:'features',loadChildren:()=>import('./modules/features/features.route')}
];
