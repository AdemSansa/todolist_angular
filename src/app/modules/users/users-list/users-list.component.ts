import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, RouterLink, Router } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
import User from '../../../shared/models/user.model';
import { LoadingService } from '../../../shared/services/loading.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-list',
  imports: [MatTableModule,MatCheckboxModule, MatIconModule, CommonModule, RouterModule,RouterLink],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit  {
  displayedColumns: string[] = ['Username', 'Email','createdAt','updatedAt','actions'];

  _userService = inject(UserService);
  _loadibgService = inject(LoadingService);
  router=inject(Router);
  listUser: User[] = [];

  currentPage :number = 1;
  currentSize :number = 10;
  searchText:string=""
  
  ngOnInit(): void {
      
    this._loadibgService.show()
      this._userService.getList(this.currentSize.toString(),this.currentPage.toString(),this.searchText).subscribe({
        next: (users) => {
          this.listUser = users;
          console.log('users:', this.listUser);
          
          this._loadibgService.hide()
        },
        error: (error) => {
          console.error('Error:', error) 
          this._loadibgService.hide()
        }
      })
  }
  deleteItem(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
       
    this._userService.deleteOne(id).subscribe({
      next: (user) => {
        this.listUser = this.listUser.filter((user) => user._id !== id);
      },
      error: (error) => {
        console.error('Error:', error)
      }
    })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your user is safe :)',
          'error'
        )
      }
    })
  }

}
