import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { Animal } from '../animal.model';

import { MatDialog } from '@angular/material';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AnimalService } from '../animal.service';
import { PagedElement } from '../pagedElement.model';
import { LoginService } from '../../security/login/login.service';
import { AnimalRegisterComponent } from '../animal-register/animal-register.component';

@Component({
  selector: 'hi-pets-animal-foradoption-list',
  templateUrl: './animal-foradoption-list.component.html',
  styleUrls: ['./animal-foradoption-list.component.css']
})
export class AnimalForAdoptionListComponent implements OnInit {

  animals: Animal[];
  pagedElement: PagedElement;

  displayedColumns: string[] = ['name', 'type', 'breed', 'behavior', 'age', 'pictureUrl'];
  dataSource = new MatTableDataSource<Animal>(this.animals);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  prepositionLabel: string = 'de';

  ngOnInit() {
    this.getAnimals(1, 100);

    if(!this.isAdmin())
      this.displayedColumns = ['name', 'type', 'breed', 'behavior', 'age', 'pictureUrl', 'buttons'];
    
  }

  isAdmin(): Boolean{
    return this.loginService.isAdmin();
  }

  getAnimals(page, pageSize) {
    this.animalService.getAnimalsForAdoption(page, pageSize)
      .subscribe(data => {
        this.pagedElement = data;
        this.dataSource = new MatTableDataSource<Animal>(this.pagedElement.elements);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.paginator._intl.itemsPerPageLabel = 'Elementos por página';

        this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
          if (length == 0 || pageSize == 0) { return `0 ${this.prepositionLabel} ${length}`; }

          length = Math.max(length, 0);

          const startIndex = page * pageSize;

          // If the start index exceeds the list length, do not try and fix the end index to the end.
          const endIndex = startIndex < length ?
            Math.min(startIndex + pageSize, length) :
            startIndex + pageSize;

          return `${startIndex + 1} - ${endIndex} ${this.prepositionLabel} ${length}`;
        }
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  requestAdoption(animal: Animal) {
    this.animalService.requestAdoption(animal.id, this.loginService.user.id)
      .subscribe( (data: any) => {
        this.toastr.success(data.notifications[0].value, 'Success!');
        this.getAnimals(1, 100);
      });
  }

  constructor(public dialog: MatDialog, private animalService: AnimalService, public toastr: ToastrService, private loginService: LoginService) {
  }

  registerAnimal(): void {
    const dialogRef = this.dialog.open(AnimalRegisterComponent, {
      width: '400px',
      data: { name: "", breed: "", age: 1, behavior: "", animalType: 1, pictureUrl: "" }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animalService.registerAnimal(result.name, result.breed, result.age, result.behavior, result.animalType, result.pictureUrl)
          .subscribe( (data: any) => {
            this.toastr.success(data.notifications[0].value, 'Success!');
            this.getAnimals(1, 100);
      });
    });
  }
}
