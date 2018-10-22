import { Component, OnInit, ViewChild } from '@angular/core';
import { AdoptedAnimal } from '../adoptedAnimal.model';

import { ToastrService } from 'ngx-toastr';

import { AnimalService } from '../animal.service';
import { PagedElement } from '../pagedElement.model';

import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'hi-pets-animal-adopted-list',
  templateUrl: './animal-adopted-list.component.html',
  styleUrls: ['./animal-adopted-list.component.css']
})
export class AnimalAdoptedListComponent implements OnInit {

  adoptedAnimals: AdoptedAnimal[];
  pagedElement: PagedElement;

  displayedColumns: string[] = ['animalName', 'animalType', 'animalBreed', 'animalPictureUrl', 'adopterName', 'adopterPhoneNumber', 'adopterEmail'];
  dataSource = new MatTableDataSource<AdoptedAnimal>(this.adoptedAnimals);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  prepositionLabel: string = 'de';

  ngOnInit() {
    this.getAdoptedAnimals(1, 100);
  }

  getAdoptedAnimals(page, pageSize) {
    this.animalService.getAdoptedAnimals(page, pageSize)
      .subscribe(data => {
        this.pagedElement = data;
        this.dataSource = new MatTableDataSource<AdoptedAnimal>(this.pagedElement.elements);

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

  constructor(private animalService: AnimalService, public toastr: ToastrService) { }
}
