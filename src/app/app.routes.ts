import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AnimalForAdoptionListComponent } from './animal/animal-foradoption-list/animal-foradoption-list.component';
import { AnimalAdoptedListComponent } from './animal/animal-adopted-list/animal-adopted-list.component';
import { AdoptionRequestListComponent } from './animal/adoption-request-list/adoption-request-list.component';
import { LoggedInGuard } from './security/loggedin.guard';

export const ROUTES: Routes = [
    { path: '', component: HomeComponent },    
    { path: 'animal-foradoption-list', component: AnimalForAdoptionListComponent, canLoad: [LoggedInGuard], canActivate: [LoggedInGuard] },
    { path: 'animal-adopted-list', component: AnimalAdoptedListComponent, canLoad: [LoggedInGuard], canActivate: [LoggedInGuard] },
    { path: 'adoption-request-list', component: AdoptionRequestListComponent, canLoad: [LoggedInGuard], canActivate: [LoggedInGuard] }
]