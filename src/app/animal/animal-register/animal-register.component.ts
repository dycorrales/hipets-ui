import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RegisterAnimal } from '../registerAnimal.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'hi-pets-animal-register',
  templateUrl: './animal-register.component.html',
  styleUrls: ['./animal-register.component.css']
})
export class AnimalRegisterComponent implements OnInit {

  registerAnimalForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AnimalRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RegisterAnimal) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.registerAnimalForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      breed: this.fb.control('', [Validators.required]),
      age: this.fb.control('', [Validators.required]),
      behavior: this.fb.control('', [Validators.required]),
      animalType: this.fb.control('', [Validators.required]),
      pictureUrl: this.fb.control('', [Validators.required])
    })
  }

  save(){
    if(this.registerAnimalForm.value.name !== "" && this.registerAnimalForm.value.breed != ""
    && this.registerAnimalForm.value.age != "" && this.registerAnimalForm.value.prevalentColor != ""
    && this.registerAnimalForm.value.behavior != ""  
    && this.registerAnimalForm.value.animalType != "" && this.registerAnimalForm.value.pictureUrl != ""  )
      this.dialogRef.close(this.registerAnimalForm.value);
  }
}
