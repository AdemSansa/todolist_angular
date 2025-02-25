import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { GroupService } from '../../../../../shared/services/groups.service';
import { FeatureService } from '../../../../../shared/services/feature.service';
import { Group } from '../../../../../shared/models/groups.model';
import { Feature } from '../../../../../shared/models/feature.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatError } from '@angular/material/form-field';
@Component({
  selector: 'app-groups-edit',
  templateUrl: './groups-edit.component.html',
  imports:[ MatInputModule, MatSelectModule, MatFormFieldModule , MatError,ReactiveFormsModule],
  styleUrls: ['./groups-edit.component.css']
})
export class GroupsEditComponent implements OnInit {
  options: FormGroup;
  group: Group = {
    code: '',
    label: '',
    description: '',
    features: [],
    status: 'active',
  };

  featuresList: Feature[] = [];
  groupId: string | null = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private groupService: GroupService,
    private featureService: FeatureService
  ) {
    this.options = this.fb.group({
      code: ['', Validators.required],
      label: ['', Validators.required],
      description: [''],
      features: [[]],
      status: ['active', Validators.required]
    });
  }

  async ngOnInit() {
    this.groupId = this.route.snapshot.paramMap.get('id');
    if (this.groupId) {
      await this.loadGroupData();
    }
    await this.loadFeaturesList();
  }

  async loadGroupData() {
    try {
      if (this.groupId) {
        this.group = await lastValueFrom(this.groupService.readOne(this.groupId));
        this.options.setValue({
          code: this.group.code,
          label: this.group.label,
          description: this.group.description,
          features: this.group.features,
          status: this.group.status
        });
      }
    } catch (error) {
      console.error('Error fetching group data:', error);
    }
  }

  async loadFeaturesList() {
    try {
      this.featuresList = await lastValueFrom(this.featureService.getList('100', '1', ''));
    } catch (error) {
      console.error('Error fetching features list:', error);
    }
  }

  async saveGroup() {
    if (this.options.valid) {
      try {
        const updatedGroup: Group = {
          ...this.group,
          ...this.options.value,
          _id: this.groupId // Ensure _id is included for the update
        };
        await lastValueFrom(this.groupService.editOne(updatedGroup));
        this.router.navigate(['/groups']);
      } catch (error) {
        console.error('Error updating group:', error);
      }
    } else {
      console.log('Form is invalid');
    }
  }
}
