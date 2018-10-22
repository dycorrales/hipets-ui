import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { AdoptionRequest } from '../adoptionRequest.model';

import { AnimalService } from '../animal.service';
import { PagedElement } from '../pagedElement.model';

import { ToastrService } from 'ngx-toastr';

import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material';

import { AdoptionStatusDialogComponent } from "../adoption-status-dialog/adoption-status-dialog.component";
import { LoginService } from 'src/app/security/login/login.service';

@Component({
  selector: 'hi-pets-adoption-request-list',
  templateUrl: './adoption-request-list.component.html',
  styleUrls: ['./adoption-request-list.component.css']
})
export class AdoptionRequestListComponent implements OnInit {

  adoptionRequests: AdoptionRequest[];
  pagedElement: PagedElement;

  statusOfRequestGetColor(statusOfRequest) {
    if (statusOfRequest === "Em progresso")
      return "accent";
    if (statusOfRequest === "Aprovado")
      return "primary";
    if (statusOfRequest === "Rejeitado")
      return "warn";
    if (statusOfRequest === "Solicitado")
      return "";
  }

  displayedColumns: string[] = ['animalName', 'animalType', 'animalBreed', 'animalPictureUrl', 'adopterName', 'adopterPhoneNumber', 'adopterEmail', 'statusOfRequest', 'rejectedDescription'];
  dataSource = new MatTableDataSource<AdoptionRequest>(this.adoptionRequests);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  prepositionLabel: string = 'de';

  ngOnInit() {
    this.getAdoptionRequests(1, 100);
       
    if(this.isAdmin())
      this.displayedColumns = ['animalName', 'animalType', 'animalBreed', 'animalPictureUrl', 'adopterName', 'adopterPhoneNumber', 'adopterEmail', 'statusOfRequest', 'rejectedDescription', 'buttons'];
    
  }

  isAdmin(): Boolean{
    return this.loginService.isAdmin();
  }

  getAdoptionRequests(page, pageSize) {
    this.animalService.getAdoptionRequests(page, pageSize)
      .subscribe(data => {
        this.pagedElement = data;
        this.dataSource = new MatTableDataSource<AdoptionRequest>(this.pagedElement.elements);

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

  constructor(public dialog: MatDialog, private animalService: AnimalService, public toastr: ToastrService, private loginService: LoginService) { }

  changeStatus(adoptionRequest): void {
    const dialogRef = this.dialog.open(AdoptionStatusDialogComponent, {
      width: '400px',
      data: adoptionRequest
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animalService.updateAdoption(result)
          .subscribe( (data: any) => {
            this.toastr.success(data.notifications[0].value, 'Success!');
            this.getAdoptionRequests(1, 100);
      });
    });
  }
}
