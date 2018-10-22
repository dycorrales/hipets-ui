import { Injectable } from '@angular/core';

import { HI_PETS_API } from '../app.api';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { PagedElement } from './pagedElement.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AnimalService {
    constructor(private http: HttpClient) {

    }

    getAnimalsForAdoption(page, pageSize): Observable<PagedElement> {
        if (page === null)
            page = 1;

        if (pageSize === null)
            pageSize = 5;

        return this.http
            .get<PagedElement>(`${HI_PETS_API}/animals?animalStatus=1&page=${page}&pageSize=${pageSize}`)
            .map((response: any) => response.data);
    }

    getAdoptedAnimals(page, pageSize): Observable<PagedElement> {
        if (page === null)
            page = 1;

        if (pageSize === null)
            pageSize = 5;
    
        return this.http
            .get<PagedElement>(`${HI_PETS_API}/adoptions?adoptionStatus=3&page=${page}&pageSize=${pageSize}`)
            .map((response: any) => response.data);
    }

    getAdoptionRequests(page, pageSize): Observable<PagedElement> {
        if (page === null)
            page = 1;

        if (pageSize === null)
            pageSize = 5;

        return this.http
            .get<PagedElement>(`${HI_PETS_API}/adoptions?page=${page}&pageSize=${pageSize}`)
            .map((response: any) => response.data);
    }

    requestAdoption(animalId, adopterId): Observable<any> {
        
        return this.http
            .post(`${HI_PETS_API}/adoptions`, { animalId: animalId, adopterId: adopterId })
            .map((response: any) => response);
    }

    registerAnimal(name, breed, age, behavior, animalType, pictureUrl): Observable<any> {
        var type;

        if (animalType === "Gato")
            type = 1;
        if (animalType === "Cachorro")
            type = 2;
        if (animalType === "Peixe")
            type = 3;
        if (animalType === "Cavalho")
            type = 4;
        if (animalType === "Pássaro")
            type = 5;
        if (animalType === "Coelho")
            type = 6;

        return this.http
            .post(`${HI_PETS_API}/animals`, { name: name, breed: breed, age: age, prevalentColor: 2, behavior: behavior, animalType: type, pictureUrl: pictureUrl })
            .map((response: any) => response);
    }

    updateAdoption(adoptionRequest): Observable<any> {
        var adoptionStatus;

        if (adoptionRequest.adoptionStatus === "Em progresso")
            adoptionStatus = 2;
        if (adoptionRequest.adoptionStatus === "Aprovado")
            adoptionStatus = 3;
        if (adoptionRequest.adoptionStatus === "Rejeitado")
            adoptionStatus = 4;

        return this.http
            .put(`${HI_PETS_API}/adoptions/${adoptionRequest.id}`,
                { adoptionStatus: adoptionStatus, adoptionObservation: adoptionRequest.adoptionObservation })
            .map((response: any) => response);
    }
}