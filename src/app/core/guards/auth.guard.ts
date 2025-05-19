import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@services/common/auth.service';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { User } from '@shared/models/user';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean | UrlTree {
        const requiredRole = route.data['role'] as string;
        const returnUrl = state.url;

        const currentUser = this.authService.currentUserValue;
        if (!currentUser || !currentUser.accessToken) {
            return this.handleUnauthorizedAccess('Chưa đăng nhập. Vui lòng đăng nhập để tiếp tục.', returnUrl);
        }

        return this.authService.fetchCurrentUser().pipe(
            switchMap((user: User | null) => {
                if (!user) {
                    return this.handleUnauthorizedAccess('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.', returnUrl);
                }
                if (requiredRole && !this.authService.hasRole(requiredRole)) {
                    return of(this.router.createUrlTree(['/unauthorized']));
                }
                return of(true);
            }),
            catchError((error) => {
                return this.handleUnauthorizedAccess('Không thể xác thực người dùng. Vui lòng đăng nhập lại.', returnUrl);
            })
        );
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.canActivate(childRoute, state);
    }

    private handleUnauthorizedAccess(message: string, returnUrl: string): Observable<UrlTree> {
        console.log('Error: ' + message);
        return of(this.router.createUrlTree(['/login'], { queryParams: { returnUrl } }));
    }
}
