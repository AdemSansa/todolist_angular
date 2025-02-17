import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import Task from '../../../../../shared/models/task.model';
import { Router, RouterModule } from '@angular/router';
import { TaskService } from '../../../../../shared/services/task.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-tasks-edit',
  imports: [FormsModule,
    RouterModule,
      ReactiveFormsModule,
      MatCheckboxModule,
      MatRadioModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatIconModule,
      MatDividerModule,
      MatButtonModule,],
  templateUrl: './tasks-edit.component.html',
  styleUrl: './tasks-edit.component.css'
})
export class TasksEditComponent implements OnInit {
  id: string = '';
  title: string = '';
  description?: string = '';
  task = new Task();
  
    _taskService = inject(TaskService);

    optionss: FormGroup;
  
    router=inject(Router);

    route = inject(ActivatedRoute);

    constructor(private fb: FormBuilder) {
      this.optionss = this.fb.group({
        title: [''],
        description: ['']
      });
    }
  ngOnInit(): void {
    // get id from route
   const id = this.route.snapshot.paramMap.get('id');
  //convert to string

  this._taskService.readOne(id).subscribe({
    next: (task) => {
      this.title = task.title;
      this.description = task.description;
    },
    error: (error) => {
      console.error('Error:', error)
    }
  })

  

   
  }

  
  
    
  
  
  
    onSubmit()
    {
      
  
      this.task.title = this.title; 
      this.task.description = this.description;
      this.task._id = this.route.snapshot.paramMap.get('id') || '';
    
      

      this._taskService.editOne(
        this.task
      ).subscribe({
        next: (task) => {
          Swal.fire('Task Updated  succesfully', '', 'success');
          
          // redirect to the list page
          this.router.navigate(['/tasks']);
  
  
    },
    error: (error) => {
      console.error('Error:', error)
    }
  })
    }
  }

