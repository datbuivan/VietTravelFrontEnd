import { Routes } from '@angular/router';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { HotelComponent } from './hotel.component';

export default [
    { path: '', component: HotelComponent },
    { path: ':id', component: HotelDetailsComponent, data: { breadcrumb: { alias: 'hotelDetails' } } }
] as Routes;
