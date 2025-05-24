import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { TourFavoriteDto } from '@shared/models/tour-favorite-dto';
import { ApiResponse } from '@app/shared/models/api-response';
import { AuthService } from '@services/common/auth.service';
import { TourFavorite } from '@app/shared/models/tour-favorite';

@Injectable({
    providedIn: 'root'
})
export class TourFavoriteService {
    baseUrl = environment.apiUrl + 'TourFavorite';
    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {}

    isFavorite(tourId: number): Observable<boolean> {
        return this.http.get<TourFavorite[]>(`${this.baseUrl}`, { headers: this.authService.getAuthHeaders() }).pipe(
            map((favorites) => favorites.some((favorite) => favorite.tourId === tourId)),
            catchError(() => of(false)) // Trả về false nếu yêu cầu thất bại
        );
    }

    getFavorites(): Observable<TourFavoriteDto[]> {
        const headers = this.authService.getAuthHeaders();
        return this.http.get<{ data: TourFavoriteDto[] }>(this.baseUrl, { headers }).pipe(
            map((response) =>
                response.data.map((item: any) => ({
                    id: item.id,
                    userId: item.userId,
                    tourId: item.tourId,
                    name: item.tour.name,
                    price: item.tour.price,
                    imageUrl: item.tour.images.find((img: any) => img.isPrimary)?.url || '',
                    createdAt: item.createdAt
                }))
            )
        );
    }
    // Thêm tour yêu thích
    addFavorite(tourId: number): Observable<TourFavorite> {
        const headers = this.authService.getAuthHeaders();
        return this.http.post<TourFavorite>(`${this.baseUrl}?tourId=${tourId}`, {}, { headers }).pipe(
            catchError((error) => {
                let errorMessage = 'Failed to add favorite';
                if (error.status === 400) {
                    const backendMessage = error.error?.message || error.message;
                    if (backendMessage.includes('already in favorites')) {
                        errorMessage = 'Tour already in favorites';
                    } else {
                        errorMessage = backendMessage || 'Invalid tour ID';
                    }
                } else if (error.status === 500) {
                    errorMessage = 'An unexpected server error occurred';
                }
                console.error('Error adding favorite:', error);
                return throwError(() => new Error(errorMessage));
            })
        );
    }

    syncFavorites(favorites: TourFavorite[]): Observable<void> {
        return this.http.post<void>(this.baseUrl + '/sync', favorites);
    }

    removeFavorite(tourId: number): Observable<void> {
        const headers = this.authService.getAuthHeaders();
        return this.http.delete<void>(this.baseUrl + `/${tourId}`, { headers }).pipe(
            catchError((error) => {
                console.error('Error removing favorite:', error);
                return throwError(() => new Error('Failed to remove favorite'));
            })
        );
    }

    saveToLocalStorage(tour: TourFavorite): void {
        let favorites: TourFavorite[] = JSON.parse(localStorage.getItem('favorites') || '[]');
        if (!favorites.some((f) => f.tourId === tour.tourId)) {
            favorites.push(tour);
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
    }

    getLocalFavorites(): TourFavorite[] {
        return JSON.parse(localStorage.getItem('favorites') || '[]');
    }
}
