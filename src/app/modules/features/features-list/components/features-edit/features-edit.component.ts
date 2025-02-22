import { Component, inject } from '@angular/core';
import { Feature } from '../../../../../shared/models/feature.model';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { FeatureService } from '../../../../../shared/services/feature.service';

import { MatFormField } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-features-edit',
  imports:   [ MatSelectModule, MatButtonModule,MatFormField,MatIconModule,MatInput,FormsModule,MatOptionModule],
  templateUrl: './features-edit.component.html',
  styleUrl: './features-edit.component.css'
})
export class FeaturesEditComponent {
  optionss: FormGroup;
  feature: Feature = {
    code: '',
    title: '',
    type: '',
    subtitle: '',
    icon: '',
    link: '',
    order: 1,
    status: 'active',
  };
  constructor(private fb: FormBuilder) {
      this.optionss = this.fb.group({
        code: [''],
        title: [''],
        type: [''],
        subtitle: [''],
        icon: [''],
        link: [''],
        order: [''],
        status: ['']
        
      });
    }

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private _featureService = inject(FeatureService);

  async ngOnInit() {
    const featureId = this.route.snapshot.paramMap.get('id');
    if (featureId) {
      try {
        this.feature = await lastValueFrom(this._featureService.readOne(featureId));
      } catch (error) {
        console.error('Error fetching feature:', error);
      }
    }
  }

  async saveFeature() {
    try {
      this.feature._id = String( this.route.snapshot.paramMap.get('id'));
      await lastValueFrom(this._featureService.editOne(this.feature));
      this.router.navigate(['/features']);
    } catch (error) {
      console.error('Error updating feature:', error);
    }
  }
}
