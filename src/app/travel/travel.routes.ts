import { Routes } from '@angular/router';
import { AppLayout } from '@travel/layout/app.layout';
import { HomeComponent } from '@travel/component/home/home.component';
import { LoginComponent } from '@travel/component/login/login.component';
import { BookingComponent } from '@travel/component/booking/booking.component';
import { RegisterComponent } from '@travel/component/register/register.component';
import { TourFavoriteComponent } from '@travel/component/tour-favorite/tour-favorite.component';
import { ConfirmEmailComponent } from '@travel/component/login/confirm-email/confirm-email.component';
import { VerifyEmailComponent } from '@travel/component/login/verify-email/verify-email.component';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { PaymentSuccessComponent } from '@travel/component/booking/payment-success/payment-success.component';
import { PaymentErrorComponent } from '@travel/component/booking/payment-error/payment-error.component';
import { PaymentHistoryComponent } from '@travel/component/payment-history/payment-history.component';

export const travelRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: HomeComponent },

            {
                path: 'tours',
                loadChildren: () => import('@travel/component/tours/tours.routes')
            },
            {
                path: 'hotels',
                loadChildren: () => import('@travel/component/hotel/hotels.routes')
            },
            {
                path: 'order-booking',
                component: BookingComponent,
                canActivate: [AuthGuard],
                canActivateChild: [AuthGuard],
                data: { role: 'USER' }
            },
            { path: 'tour-favorite', component: TourFavoriteComponent },
            { path: 'verify-email', component: VerifyEmailComponent },
            { path: 'success-payment', component: PaymentSuccessComponent },
            { path: 'error-payment', component: PaymentErrorComponent },
            {
                path: 'payment-history',
                component: PaymentHistoryComponent,
                canActivate: [AuthGuard],
                canActivateChild: [AuthGuard],
                data: { role: 'USER' }
            }
        ]
    },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'confirm-email', component: ConfirmEmailComponent }
];
