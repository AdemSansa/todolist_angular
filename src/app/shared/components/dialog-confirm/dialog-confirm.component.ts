import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './dialog-confirm.component.html',
  styleUrl: './dialog-confirm.component.css'
})
export class DialogConfirmComponent {
  

  constructor(public dialogRef: MatDialogRef<DialogConfirmComponent> , @Inject(MAT_DIALOG_DATA) public data: any) { }

  confirm() {
    this.dialogRef.close(true); 
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
