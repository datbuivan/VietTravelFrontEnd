import { Routes } from '@angular/router';
import { AdminLayout } from '@admin/layout/admin.layout';
import { TourManagementComponent } from '@admin/component/tour-management/tour-management';
import { CityManagementComponent } from '@admin/component/city-management/city-management.component';
import { HotelManagementComponent } from '@admin/component/hotel-management/hotel-management.component';
import { AddTourComponent } from '@admin/component/tour-management/add-tour/add-tour.component';
import { AddHotelComponent } from '@admin/component/hotel-management/add-hotel/add-hotel.component';
import { AddCityComponent } from '@admin/component/city-management/add-city/add-city.component';
import { TourDetailComponent } from '@admin/component/tour-management/tour-detail/tour-detail.component';
import { CityDetailComponent } from '@admin/component/city-management/city-detail/city-detail.component';
import { HotelDetailComponent } from '@admin/component/hotel-management/hotel-detail/hotel-detail.component';
import { AuthGuard } from '@core/guards/auth.guard';
import { DashboardComponent } from '@admin/component/dashboard/dashboard.component';

export const adminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminLayout,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: { role: 'ADMIN' },
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'tours', component: TourManagementComponent },
            { path: 'cities', component: CityManagementComponent },
            { path: 'hotels', component: HotelManagementComponent },
            { path: 'add-tour', component: AddTourComponent },
            { path: 'add-hotel', component: AddHotelComponent },
            { path: 'add-city', component: AddCityComponent },
            { path: 'tour/:id', component: TourDetailComponent },
            { path: 'city/:id', component: CityDetailComponent },
            { path: 'hotel/:id', component: HotelDetailComponent },
            { path: 'city/:id/edit', component: AddCityComponent }
        ]
    }
];
