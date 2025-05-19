import { Routes } from '@angular/router';
import { TourDetailsComponent } from '@travel/component/tours/tour-details/tour-details.component';
import { ToursComponent } from '@travel/component/tours/tours.component';

export default [
    { path: '', component: ToursComponent },
    { path: ':id', component: TourDetailsComponent, data: { breadcrumb: { alias: 'tourDetails' } } }
] as Routes;
