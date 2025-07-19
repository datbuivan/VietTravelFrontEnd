import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '@app/shared/models/review';
import { environment } from '@environments/environment';
import { map, Observable } from 'rxjs';
import { AuthService } from '../common/auth.service';
import { ReviewCreate } from '@app/shared/models/create-review';

@Injectable({
    providedIn: 'root'
})
export class ReviewService {
    baseUrl = environment.apiUrl;

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {}

    getReviewsByTourId(tourId: number): Observable<Review[]> {
        return this.http.get<{ data: Review[] }>(`${this.baseUrl}Review/0/${tourId}`).pipe(
            map((response) => {
                return response.data;
            })
        );
    }

    createReviewAsync(review: ReviewCreate): Observable<Review> {
        const headers = this.authService.getAuthHeaders(); // Lấy header chứa token
        return this.http.post<{ data: Review }>(this.baseUrl + 'Review', review, { headers }).pipe(
            map((response) => {
                return response.data;
            })
        );
    }

    // CanUserReviewAsync(tourId: number, hotelId?: number): Observable<boolean> {
    //     const params: { tourId?: number; hotelId?: number } = {};
    //     const headers = this.authService.getAuthHeaders();
    //     if (tourId) params.tourId = tourId;
    //     if (hotelId) params.hotelId = hotelId;
    //     return this.http.get<boolean>(`${this.baseUrl}Review/can-review`, { params });
    // }
}
