import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Feature } from '../../../shared/models/feature.model';
import { FeatureService } from '../../../shared/services/feature.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatOptionModule } from '@angular/material/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-features-add',
  imports: [RouterModule , MatButtonModule,MatFormField,MatIconModule,MatInput,FormsModule,MatOptionModule],


  templateUrl: './features-add.component.html',
  styleUrl: './features-add.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturesAddComponent {

  feature: Feature = {
    code: '',
    title: '',
    type: '',
    subtitle: '',
    icon: '',
    link: '',
    order: 1,
    status: 'active'
  };
  router = inject(Router);
  _featureService = inject(FeatureService);
  async saveFeature() {
    try {
      await this._featureService.addNewOne(this.feature).toPromise();
      Swal.fire('Success', 'Feature created successfully', 'success');

    
      this.router.navigate(['/features']);
    } catch (error) {
      console.error('Error creating feature:', error);
    }
  }
}
