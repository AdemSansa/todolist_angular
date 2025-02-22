import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { FeatureService } from '../../shared/services/feature.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  TotalUsers : number = 0;

  TotalFeatures : number = 0;

  ngOnInit(): void {
    this.getUsers();
    this.getFeatures(); 
  }
  _userService= inject(UserService)
  _featuresService = inject(FeatureService)





  getUsers() {
    this._userService.getAllUsers().subscribe((data) => {
      this.TotalUsers = data.length;

    });
  }

  getFeatures() {
     this._featuresService.getAllFeatures().subscribe((data) => {
     this.TotalFeatures = data.length;
   });
  }
}
