import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GroupService } from '../../../../../shared/services/groups.service';
import { Group } from '../../../../../shared/models/groups.model';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { FeatureService } from '../../../../../shared/services/feature.service';
import { Feature } from '../../../../../shared/models/feature.model';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-groups-details',
  imports: [RouterLink,CommonModule, MatSelectModule, MatSlideToggleModule,MatFormFieldModule, MatOptionModule, MatTableModule,FormsModule,ReactiveFormsModule],
  templateUrl: './groups-details.component.html',
  styleUrls: ['./groups-details.component.css']
})
export class GroupsDetailsComponent {

  pendingUpdates: any = {}; // Store pending updates
  updateTimeout: any; // Timeout to batch updates
  selectedFeatureID: string = '';
  features: Feature[] = [];
  cdr=inject(ChangeDetectorRef);
  group: Group | null = null;
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);
  private _groupService = inject(GroupService);
  private _featureService = inject(FeatureService);

  ngOnInit() {
    const groupId = this.route.snapshot.paramMap.get('id');
    if (groupId) {
      this._groupService.readOne(groupId).subscribe({
        next: (data) => 
          {
            (this.group = data),
            console.log('Group:', data);
          }
        ,

        error: (err) => console.error('Error fetching group:', err),
      });
    }
    this.getFeaturesList();
    
    
    this.getFeaturesGroups();

  }
  
  getFeaturesList() {
    return this._featureService.getList('100', '1', '').subscribe({
      next: (data) => 
      {
        console.log('Features:', data);
        
        this.features = data;
      },
      error: (err) => console.error('Error fetching features:', err),
    });
  }



  addFeatureToGroup(featureId: string) {
    if (this.group) {
     this._groupService.AddFeatureToGroup(String(this.route.snapshot.paramMap.get('id') ), featureId).subscribe({
        next: (data) => {
          console.log('Feature added to group:', data);
          
          this.snackBar.open('Feature added to group', 'Close', {
            duration: 2000,
          });
          const name = this.features.find((feature) => feature._id === data.feature)?.title;
          const FeatureGroup = 
          {
            ...data,
            featureName: name || 'Unknown',
          };

          
          this.dataSource.push(FeatureGroup);
          this.dataSource = [...this.dataSource];
          this.cdr.detectChanges();
         

          
          
         
          
          

        },
        error: (err) => console.error('Error adding feature to group:', err),
      });
  }
  }



  getFeaturesGroups() {

   
      this._groupService.getGroupFeatures(String(this.route.snapshot.paramMap.get('id'))).subscribe({
        next: (data) => {
          console.log('Features:', data);

          this.dataSource = data;
          this._featureService.getList('100', '1', '').subscribe({
            next: (features) =>
            {
              this.dataSource = this.dataSource.map((groupFeature) => {
                const feature = features.find((feature) => feature._id === groupFeature.feature);
                return {
                  ...groupFeature,
                  featureName: feature?.title || 'Unknown',
                  
                };
              });
            }
            ,
      },);
        }
        ,


        error: (err) => console.error('Error fetching features:', err),
      });






  }
  updateGroupFeature(groupFeature: any) {
  
    
    this._groupService.updateGroupFeature(groupFeature).subscribe({
      next: (data) => {
        console.log('Group feature updated:', data);
        this.snackBar.open('Group feature updated', 'Close', {
          duration: 2000,
        });
      
      },
      error: (err) => console.error('Error updating group feature:', err),
    });
  }


  displayedColumns: string[] = ['feature', 'create', 'read', 'list', 'update', 'delete'];
  dataSource : any[] = [ 
  ];
  changeValue(event: any, groupFeature: any, field: string) {
    const value = event.checked;
    console.log('Change value:', groupFeature, field, value);
    
    this.updateGroupFeature({
      ...groupFeature,
      [field]: value,
    }); 

    

  }


  deleteFeatureFromGroup(id: string) {

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this feature from group!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
    this._groupService.deleteGroupFeature(id).subscribe({
      next: (data) => {
        console.log('Feature deleted from group:', data);
        this.snackBar.open('Feature deleted from group', 'Close', {
          duration: 2000,
        });
        this.dataSource = this.dataSource.filter((feature) => feature._id !== id);
      },
      error: (err) => console.error('Error deleting feature from group:', err),
    });
  }

});

  
  } 
  }
  ;

