import { Component, inject, OnInit } from '@angular/core';
import { Feature } from '../../../shared/models/feature.model';
import { FeatureService } from '../../../shared/services/feature.service';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-features-list',
  imports: [MatTableModule , RouterModule,MatButtonModule,MatButtonToggleModule,MatIconModule],
  templateUrl: './features-list.component.html',
  styleUrl: './features-list.component.css'
})
export class FeaturesListComponent implements OnInit {

  features: Feature[] = [];

  _featureService = inject(FeatureService);
   ngOnInit() {
    this.getList();
  }

  getList() {
    this._featureService.getList('10', '1', '').subscribe({
      next: (features) => {
        this.features = features;
      },
      error: (error) => {
        console.error('Error:', error)
      }
    })
  }
  async deleteFeature(id: string) {
  
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._featureService.deleteOne(id).subscribe({
          next: () => {
            this.getList();
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          },
          error: (error) => {
            console.error('Error:', error)
          }
        })
 

        
      }
    }
    )
  }
}

