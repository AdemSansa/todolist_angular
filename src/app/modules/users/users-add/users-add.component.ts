import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import User from '../../../shared/models/user.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
import Swal from 'sweetalert2';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-users-add',
  imports: [FormsModule,
      ReactiveFormsModule,
      MatCheckboxModule,
      MatRadioModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatIconModule,
      MatDividerModule,
      MatButtonModule,],
  templateUrl: './users-add.component.html',
  styleUrl: './users-add.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class UsersAddComponent {

  username: string = '';
  email: string = '';
  
  User = new User();

  optionss: FormGroup;

  router=inject(Router);

  constructor(private fb: FormBuilder) {
    this.optionss = this.fb.group({
      username: [''],
      email: ['']
        
    });
  }


  

  _userService = inject(UserService);

  onSubmit()
  {
 

    this.User.username = this.username;
    this.User.email = this.email;
  

    

    this._userService.addNewOne(
      this.User

    ).subscribe({
      next: (task) => {
        Swal.fire('User Added succesfully', '', 'success');
        
        // redirect to the list page
        this.router.navigate(['/users']);


  },
  error: (error) => {
    console.error('Error:', error)
  }
})
  }
}
