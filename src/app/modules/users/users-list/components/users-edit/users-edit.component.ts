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
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import User from '../../../../../shared/models/user.model';
import { UserService } from '../../../../../shared/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-edit',
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
  templateUrl: './users-edit.component.html',
  styleUrl: './users-edit.component.css'
})
export class UsersEditComponent implements OnInit {
  id: string = '';
  email: string = '';
  username: string = '';
  User = new User();
  _userService = inject(UserService);
  optionss: FormGroup;
  router=inject(Router);
  route = inject(ActivatedRoute);
  
  constructor(private fb: FormBuilder) {
    this.optionss = this.fb.group({
      username: [''],
      email: ['']
    });
  }
  ngOnInit(): void {
    // get id from route
   const id = this.route.snapshot.paramMap.get('id');
   this._userService.readOne(id).subscribe({
      next: (user) => {
        this.username = user.username;
        this.email = user.email;
      },
      error: (error) => {
        console.error('Error:', error) 
      }
    })
  }

  onSubmit()
  {
    this.User.username = this.username;
    this.User.email = this.email;
    this.User._id = this.route.snapshot.paramMap.get('id') || '';
    this._userService.editOne(this.User).subscribe({
      next: (user) => {
        Swal.fire('User updated successfully', '', 'success');
        
        this.router.navigate(['/users']);
      },
      error: (error) => {
        console.error('Error:', error)
      }
    })
  }
  
  
}
