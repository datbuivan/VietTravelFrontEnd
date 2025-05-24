import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject, Injector } from '@angular/core';
import { AuthService } from '@services/common/auth.service';
import { User } from '@shared/models/user';
import { catchError, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TokenService } from '@app/services/common/token.service';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
    const tokenService = inject(TokenService);
    const messageService = inject(MessageService);
    const authService = inject(AuthService);
    const router = inject(Router);

    const token = tokenService.getAccessToken();

    let authReq = req;
    if (token) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    return next(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                return handle401Error(authReq, next, authService, tokenService, messageService, router);
            }
            return throwError(() => error);
        })
    );
};

const handle401Error = (req: HttpRequest<any>, next: HttpHandlerFn, authService: AuthService, tokenService: TokenService, messageService: MessageService, router: Router) => {
    const user = tokenService.getUser(); // Sử dụng TokenService để lấy user
    if (!user || !user.refreshToken) {
        authService.logout();
        router.navigate(['/login']);
        return throwError(() => new Error('No refresh token available'));
    }

    return authService.refreshToken().pipe(
        switchMap((newUser: User) => {
            tokenService.setUser(newUser); // Cập nhật TokenService với newUser
            const newToken = newUser.accessToken;
            const newReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${newToken}`
                }
            });
            return next(newReq);
        }),
        catchError((error: HttpErrorResponse) => {
            authService.logout();
            router.navigate(['/login']);
            return throwError(() => error);
        })
    );
};
