import { Routes } from '@angular/router';
import { Notfound } from '@app/pages/notfound/notfound';
import { adminRoutes } from '@admin/admin.routes';
import { travelRoutes } from '@travel/travel.routes';

export const appRoutes: Routes = [...adminRoutes, ...travelRoutes, { path: 'notfound', component: Notfound }, { path: '**', redirectTo: '/notfound' }];
