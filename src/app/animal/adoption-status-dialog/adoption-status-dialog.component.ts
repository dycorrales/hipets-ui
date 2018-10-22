import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdoptionRequest } from '../adoptionRequest.model'

@Component({
  selector: 'hi-pets-adoption-status-dialog',
  templateUrl: './adoption-status-dialog.component.html',
  styleUrls: ['./adoption-status-dialog.component.css']
})
export class AdoptionStatusDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AdoptionStatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AdoptionRequest) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(){}
}
