
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FloatLabelType, MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {map} from 'rxjs/operators';

import Swal  from 'sweetalert2';


import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { TaskService } from '../../../shared/services/task.service';
import Task from '../../../shared/models/task.model';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-tasks-add',
  imports: [  FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,

  ],
  templateUrl: './tasks-add.component.html',
  styleUrl: './tasks-add.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class TasksAddComponent {

  title: string = '';
  description: string = '';
  task = new Task();

  optionss: FormGroup;

  router=inject(Router);

  constructor(private fb: FormBuilder) {
    this.optionss = this.fb.group({
      title: [''],
      description: ['']
    });
  }


  

  _taskService = inject(TaskService);


  onSubmit()
  {
 

    this.task.title = this.title; 
    this.task.description = this.description;
  
    console.log('task:', this.title);
    

    this._taskService.addNewOne(
      this.task

    ).subscribe({
      next: (task) => {
        Swal.fire('Task Added succesfully', '', 'success');
        
        // redirect to the list page
        this.router.navigate(['/tasks']);


  },
  error: (error) => {
    console.error('Error:', error)
  }
})
  }
}
