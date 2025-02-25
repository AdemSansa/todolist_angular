import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { lastValueFrom } from 'rxjs';
import { FeatureService } from '../../../shared/services/feature.service'; 
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { Feature } from '../../../shared/models/feature.model';  // Adjust path to your model
import { MatSelectModule } from '@angular/material/select';
import Swal from 'sweetalert2';
import { GroupService } from '../../../shared/services/groups.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-groups-add',
  templateUrl: './groups-add.component.html',
  styleUrls: ['./groups-add.component.css'],
  imports: [MatButtonModule,CommonModule,MatSelectModule,ReactiveFormsModule, MatIconModule, FormsModule, MatOptionModule],
})
export class GroupsAddComponent implements OnInit {
  group = {
    code: '',
    label: '',
    features: [] as Feature[],  // Store selected features
  };
  featuresList: Feature[] = [];  // List of available features

  constructor(
    private router: Router,
    private featureService: FeatureService  // Feature service to fetch available features
  ) {
  }


  async ngOnInit(): Promise<void> {
    await this.loadFeaturesList();
  }

  async loadFeaturesList() {
    try {
      // Fetch the list of available features
      this.featuresList = await lastValueFrom(this.featureService.getList('100', '1', ''));
    } catch (error) {
      console.error('Error fetching features list:', error);
    }
  }

  _GroupService = inject(GroupService);
  async saveGroup() {
    try {
      await this._GroupService.addNewOne(this.group).toPromise();
      Swal.fire('Success', 'group created successfully', 'success');

    
      this.router.navigate(['/groups']);
    } catch (error) {
      console.error('Error creating feature:', error);
    }
  }
}
