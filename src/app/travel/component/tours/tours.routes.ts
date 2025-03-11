import { Routes } from '@angular/router';
import { TourDetailsComponent } from './tour-details/tour-details.component';
import { ToursComponent } from './tours.component';

export default [
    { path: '', component: ToursComponent },
    { path: ':id', component: TourDetailsComponent, data: { breadcrumb: { alias: 'tourDetails' } } }
] as Routes;
