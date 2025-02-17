import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { LoadingService } from './shared/services/loading.service';
import { LoadingComponent } from "./shared/components/loading/loading.component";
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink, NavbarComponent, MatSidenavModule,MatButtonModule,MatIcon,RouterLinkActive ,MatListModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'to-do-list';
  _loadingService = inject(LoadingService);
  showFiller = false;

  
}
