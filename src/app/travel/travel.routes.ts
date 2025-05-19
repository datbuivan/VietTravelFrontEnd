import { Routes } from '@angular/router';
import { AppLayout } from '@travel/layout/app.layout';
import { HomeComponent } from '@travel/component/home/home.component';
import { LoginComponent } from '@travel/component/login/login.component';
import { BookingComponent } from '@travel/component/booking/booking.component';
import { RegisterComponent } from '@travel/component/register/register.component';

export const travelRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: HomeComponent },

            {
                path: 'tour',
                loadChildren: () => import('@travel/component/tours/tours.routes')
            },
            {
                path: 'hotel',
                loadChildren: () => import('@travel/component/hotel/hotels.routes')
            },
            { path: 'order-booking', component: BookingComponent }
        ]
    },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent }
];
