import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { User } from '@shared/models/user';
import { Router } from '@angular/router';
import { ApiResponse } from '@shared/models/api-response';
import { environment } from '@environments/environment';
import { TokenService } from '@services/common/token.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    baseUrl = environment.apiUrl;
    private loggedIn = new BehaviorSubject<boolean>(false);
    private roles = new BehaviorSubject<string[]>([]);
    // private currentUserSubject = new BehaviorSubject<User | null>(null);
    // public currentUser = this.currentUserSubject.asObservable();
    constructor(
        private http: HttpClient,
        private router: Router,
        private tokenService: TokenService
    ) {
        this.tokenService.initializeFromStorage();
        this.updateAuthState();
    }

    get isLoggedIn(): Observable<boolean> {
        return this.loggedIn.asObservable();
    }

    get userRoles(): Observable<string[]> {
        return this.roles.asObservable();
    }

    get currentUserValue(): User | null {
        return this.tokenService.getUser();
    }

    private updateAuthState(): void {
        const user = this.tokenService.getUser();
        this.loggedIn.next(!!user && !!user.accessToken);
        this.roles.next(user?.roles || []);
    }

    fetchCurrentUser(): Observable<User | null> {
        const token = this.tokenService.getAccessToken();
        const refreshToken = this.tokenService.getRefreshToken();
        if (!token) {
            // this.clearStorage();
            this.tokenService.setUser(null);
            this.updateAuthState();
            return of(null);
        }

        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<ApiResponse<User>>(this.baseUrl + 'Auth/current-user', { headers }).pipe(
            map((response: ApiResponse<User>) => {
                if (response.statusCode === 200 && response.data) {
                    const user = {
                        ...response.data,
                        accessToken: token,
                        refreshToken: refreshToken
                    } as User;
                    this.tokenService.setUser(user);
                    this.updateAuthState();
                    // localStorage.setItem('currentUser', JSON.stringify(user));
                    // this.currentUserSubject.next(user);
                    // this.roles.next(user.roles || []);
                    // this.loggedIn.next(true);
                    return user;
                }
                // this.clearStorage();
                this.tokenService.setUser(null);
                this.updateAuthState();
                return null;
            }),
            catchError((error) => {
                console.log(error);
                // this.clearStorage();
                this.tokenService.setUser(null);
                this.updateAuthState();
                return of(null);
            })
        );
    }

    login(email: string, password: string): Observable<User> {
        return this.http.post<ApiResponse<User>>(this.baseUrl + 'Auth/login', { email, password }).pipe(
            map((response: ApiResponse<User>) => {
                if (response.statusCode === 200 && response.data) {
                    const user = response.data;
                    if (!user.accessToken) {
                        throw new Error('API trả về user không có accessToken');
                    }
                    user.roles = user.roles || ['USER'];
                    this.tokenService.setUser(user);
                    this.updateAuthState();
                    this.redirectBasedOnRole(user.roles);
                    // localStorage.setItem('currentUser', JSON.stringify(user));
                    // this.currentUserSubject.next(user);
                    // this.roles.next(user.roles || []);
                    // this.loggedIn.next(true);
                    return user;
                }
                throw new Error(response.message || 'Đăng nhập thất bại');
            }),
            catchError((error) => {
                console.log(error);
                return of(null as any);
            })
        );
    }

    register(username: string, email: string, password: string): Observable<any> {
        return this.http.post<any>(this.baseUrl + 'register', { username, email, password });
    }

    logout(): void {
        this.http.post(this.baseUrl + 'Auth/logout', {}).subscribe({
            error: () => {
                // this.clearStorage()
                this.tokenService.setUser(null);
                this.updateAuthState();
            }
        });
        // this.clearStorage();
        this.tokenService.setUser(null);
        this.updateAuthState();
        this.router.navigate(['/login']);
    }

    refreshToken(): Observable<User> {
        const refreshToken = this.currentUserValue?.refreshToken;
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.currentUserValue?.accessToken}`);
        return this.http.post<ApiResponse<User>>(this.baseUrl + 'Auth/refresh-token', { refreshToken }, { headers }).pipe(
            map((response: ApiResponse<User>) => {
                if (response.statusCode === 200 && response.data) {
                    const user = response.data;
                    this.tokenService.setUser(null);
                    this.updateAuthState();
                    // localStorage.setItem('currentUser', JSON.stringify(user));
                    // this.currentUserSubject.next(user);
                    // this.roles.next(user.roles || []);
                    // this.loggedIn.next(true);
                    return user;
                }
                throw new Error(response.message || 'Làm mới token thất bại');
            }),
            catchError((error) => {
                console.log(error);
                // this.clearStorage();
                this.tokenService.setUser(null);
                this.updateAuthState();
                return of(null as any);
            })
        );
    }

    redirectBasedOnRole(roles: string[]): void {
        if (roles.includes('ADMIN')) {
            this.router.navigate(['/admin/cities']);
        } else if (roles.includes('USER')) {
            this.router.navigate(['/']);
        } else {
            this.router.navigate(['/unauthorized']);
        }
    }

    // private clearStorage(): void {
    //     localStorage.removeItem('currentUser');
    //     this.currentUserSubject.next(null);
    //     this.roles.next([]);
    //     this.loggedIn.next(false);
    // }

    hasRole(role: string): boolean {
        return this.roles.value.includes(role);
    }
}
