import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { HomeComponent } from './app/travel/component/home/home.component';
import { LoginComponent } from './app/travel/component/login/login.component';
import { ToursComponent } from './app/travel/component/tours/tours.component';
import { HotelComponent } from './app/travel/component/hotel/hotel.component';
import { HotelDetailsComponent } from './app/travel/component/hotel/hotel-details/hotel-details.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: HomeComponent },
            { path: 'login', component: LoginComponent },
            {
                path: 'tour',
                loadChildren: () => import('./app/travel/component/tours/tours.routes')
            },
            {
                path: 'hotel',
                loadChildren: () => import('./app/travel/component/hotel/hotels.routes')
            }
        ]
    },
    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
