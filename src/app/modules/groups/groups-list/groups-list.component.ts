import { Component, inject, OnInit } from '@angular/core';
import { Group } from '../../../shared/models/groups.model'; // Assuming you have a group model
import { GroupService } from '../../../shared/services/groups.service'; // Assuming you have a group service
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-groups-list',
  imports: [MatTableModule, RouterModule, MatButtonModule, MatButtonToggleModule, MatIconModule],
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit {
  groups: Group[] = [];

  _groupService = inject(GroupService);

  ngOnInit() {
    this.getList();
  }

  getList() {
    this._groupService.getList('10', '1', '').subscribe({
      next: (groups) => {
        this.groups = groups;
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  async deleteGroup(id: string) {
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
        this._groupService.deleteOne(id).subscribe({
          next: () => {
            this.getList();
            Swal.fire('Deleted!', 'Your group has been deleted.', 'success');
          },
          error: (error) => {
            console.error('Error:', error);
          }
        });
      }
    });
  }
}
