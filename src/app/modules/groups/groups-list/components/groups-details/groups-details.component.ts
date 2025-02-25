import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GroupService } from '../../../../../shared/services/groups.service';
import { Group } from '../../../../../shared/models/groups.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-groups-details',
  imports: [RouterLink,CommonModule],
  templateUrl: './groups-details.component.html',
  styleUrls: ['./groups-details.component.css']
})
export class GroupsDetailsComponent {
  group: Group | null = null;
  private route = inject(ActivatedRoute);
  private _groupService = inject(GroupService);

  ngOnInit() {
    const groupId = this.route.snapshot.paramMap.get('id');
    if (groupId) {
      this._groupService.readOne(groupId).subscribe({
        next: (data) => (this.group = data),
        error: (err) => console.error('Error fetching group:', err),
      });
    }
  }
}
