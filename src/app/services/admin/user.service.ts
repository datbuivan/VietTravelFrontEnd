import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateRoleDto } from '@app/shared/models/create-role-dto';
import { CreateUserDto } from '@app/shared/models/create-user-dto';
import { Role } from '@app/shared/models/role';
import { UserUpdateDto } from '@app/shared/models/update-user-dto';
import { UserDto } from '@app/shared/models/user-dto';
import { environment } from '@environments/environment';
import { AuthService } from '@services/common/auth.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    baseUrl = environment.apiUrl;
    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {}

    private get headers() {
        return this.authService.getAuthHeaders();
    }

    getUsers(): Observable<UserDto[]> {
        return this.http.get<UserDto[]>(`${this.baseUrl}User`, { headers: this.headers });
    }

    getUser(id: string): Observable<UserDto> {
        return this.http.get<UserDto>(`${this.baseUrl}User/${id}`, { headers: this.headers });
    }

    createUser(user: CreateUserDto): Observable<UserDto> {
        return this.http.post<UserDto>(`${this.baseUrl}User`, user, { headers: this.headers });
    }

    updateUser(id: string, user: UserUpdateDto): Observable<UserDto> {
        return this.http.put<UserDto>(`${this.baseUrl}User/${id}`, user, { headers: this.headers });
    }

    deleteUser(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}User/${id}`, { headers: this.headers });
    }

    assignRole(userId: string, roleName: string): Observable<string> {
        return this.http.post<string>(`${this.baseUrl}User/${userId}/roles/${roleName}`, null, { headers: this.headers });
    }
    getRoles(): Observable<Role[]> {
        return this.http.get<Role[]>(`${this.baseUrl}Role`, { headers: this.headers });
    }

    createRole(role: CreateRoleDto): Observable<Role> {
        return this.http.post<Role>(`${this.baseUrl}Role`, role, { headers: this.headers });
    }

    removeRole(userId: string, roleName: string): Observable<string> {
        return this.http.delete<string>(`${this.baseUrl}user/${userId}/roles/${roleName}`, { headers: this.headers });
    }
}
