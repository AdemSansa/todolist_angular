import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../../shared/services/task.service';
import Task from '../../../shared/models/task.model';
import { LoadingService } from '../../../shared/services/loading.service';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tasks-list',
  imports: [MatTableModule,MatCheckboxModule, MatIconModule, CommonModule, RouterModule,RouterLink],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css'
})
export class TasksListComponent implements OnInit  {
  displayedColumns: string[] = ["check",'title', 'description','createdAt','updatedAt','actions'];

  _taskService = inject(TaskService);
  _loadibgService = inject(LoadingService);
  router=inject(Router);
  listTask: Task[] = [];
  currentPage :number = 1;
  currentSize :number = 10;
  searchText:string=""
  ngOnInit(): void {
    this._loadibgService.show()
      this._taskService.getList(this.currentSize.toString(),this.currentPage.toString(),this.searchText).subscribe({
        next: (tasks) => {
          this.listTask = tasks;
          console.log('tasks:', this.listTask);
          
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
      text: 'You will not be able to recover this task!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
       
    this._taskService.deleteOne(id).subscribe({
      next: (task) => {
        this.listTask = this.listTask.filter((task) => task._id !== id);
      },
      error: (error) => {
        console.error('Error:', error)
      }
    })
  }
  else{
    Swal.fire('Task is safe', '', 'success');
    
  }
})
}
}

