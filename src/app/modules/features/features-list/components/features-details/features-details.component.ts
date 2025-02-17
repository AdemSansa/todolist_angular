import { Component, inject } from '@angular/core';
import { Feature } from '../../../../../shared/models/feature.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FeatureService } from '../../../../../shared/services/feature.service';

@Component({
  selector: 'app-features-details',
  imports: [RouterLink],
  templateUrl: './features-details.component.html',
  styleUrl: './features-details.component.css'
})
export class FeaturesDetailsComponent {
    feature: Feature | null = null;
    private route = inject(ActivatedRoute);
    private _featureService = inject(FeatureService);
  
    ngOnInit() {
      const featureId = this.route.snapshot.paramMap.get('id');
      if (featureId) {
        this._featureService.readOne(featureId ).subscribe({
          next: (data) => (this.feature = data),
          error: (err) => console.error('Error fetching feature:', err),
        });
      }
    }
  }
  

