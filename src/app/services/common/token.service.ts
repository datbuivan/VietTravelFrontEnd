import { Injectable } from '@angular/core';
import { User } from '@app/shared/models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    private userSubject = new BehaviorSubject<User | null>(null);

    setUser(user: User | null) {
        this.userSubject.next(user);
        if (user) {
            try {
                const userString = JSON.stringify(user);
                if (!userString) {
                    throw new Error('Không thể chuyển user thành JSON');
                }
                localStorage.setItem('currentUser', userString);
            } catch (error) {
                this.userSubject.next(null);
            }
        } else {
            localStorage.removeItem('currentUser');
            this.userSubject.next(null);
        }
    }

    getUser(): User | null {
        return this.userSubject.value;
    }

    getAccessToken(): string | null {
        return this.userSubject.value?.accessToken || null;
    }

    getRefreshToken(): string | null {
        return this.userSubject.value?.refreshToken || null;
    }

    initializeFromStorage(): void {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser) as User;
                if (user && user.accessToken) {
                    this.userSubject.next(user);
                } else {
                    this.setUser(null);
                }
            } catch (error) {
                console.error('Lỗi khi phân tích user từ localStorage:', error);
                this.setUser(null);
            }
        }
    }
}
