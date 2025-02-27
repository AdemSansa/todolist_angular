import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { lastValueFrom } from 'rxjs';
import { FeatureService } from '../../../shared/services/feature.service'; 
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
  imports: [MatButtonModule,CommonModule,MatSelectModule, MatIconModule, FormsModule, MatOptionModule ,ReactiveFormsModule],
})
export class GroupsAddComponent implements OnInit {
  featuresForm!: FormGroup;

  group = {
    code: '',
    label: '',
  };

 

  constructor(

    private fb: FormBuilder,
    private router: Router,
    private featureService: FeatureService  // Feature service to fetch available features
  ) {
  }


  async ngOnInit(): Promise<void> {
    this.featuresForm = this.fb.group({
      code: ['', Validators.required],
      label: ['', Validators.required],

    });
   
  }

  


  _GroupService = inject(GroupService);
  async saveGroup() {
    try {
      this.group.code = this.featuresForm.value.code;
      this.group.label = this.featuresForm.value.label;

      console.log('Group:', this.group);
      
      await this._GroupService.addNewOne(this.group).toPromise();
      Swal.fire('Success', 'group created successfully', 'success');

    
      this.router.navigate(['/groups']);
    } catch (error) {
      console.error('Error creating feature:', error);
    }
  }
}
  