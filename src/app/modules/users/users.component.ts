import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoadingService } from '../../shared/services/loading.service';
import { LoadingComponent } from "../../shared/components/loading/loading.component";

@Component({
  selector: 'app-users',
  imports: [RouterModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  _loadingService = inject(LoadingService);
}
