import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Tour } from '@shared/models/tour';
import { environment } from '@environments/environment';
import { TourSchedule } from '@app/shared/models/tourSchedule';
import { ApiResponse } from '@app/shared/models/api-response';
import { TourStartDate } from '@app/shared/models/tourStartDate';
import { TourSpecParams } from '@app/shared/models/tour-params';

@Injectable({
    providedIn: 'root'
})
export class TourService {
    baseUrl = environment.apiUrl;
    tours: Tour[] = [];
    tour: Tour | null = null;
    constructor(private http: HttpClient) {}
    getTour(id: number): Observable<Tour> {
        return this.http.get<{ data: Tour }>(this.baseUrl + 'tour/' + id).pipe(
            map((res) => {
                this.tour = res.data;
                return this.tour;
            })
        );
    }

    getTours(): Observable<Tour[]> {
        return this.http.get<{ data: Tour[] }>(this.baseUrl + 'tour').pipe(
            map((res) => {
                this.tours = res.data;
                return this.tours;
            })
        );
    }

    getToursWithSpec(params: TourSpecParams): Observable<Tour[]> {
        let httpParams = new HttpParams();
        if (params.cityId) {
            httpParams = httpParams.set('cityId', params.cityId.toString());
        }
        if (params.sort) {
            httpParams = httpParams.set('sort', params.sort);
        }
        if (params.search) {
            httpParams = httpParams.set('search', params.search);
        }
        if (params.minPrice) {
            httpParams = httpParams.set('minPrice', params.minPrice.toString());
        }
        if (params.maxPrice) {
            httpParams = httpParams.set('maxPrice', params.maxPrice.toString());
        }
        if (params.startDate) {
            httpParams = httpParams.set('startDate', this.formatDate(params.startDate));
        }
        return this.http.get<ApiResponse<Tour[]>>(this.baseUrl + 'Tour/spec-params', { params: httpParams }).pipe(
            map((response) => {
                return response.data || [];
            }),
            catchError((error) => {
                console.error('Lỗi khi lấy danh sách tour:', error);
                return throwError(() => new Error('Không thể lấy danh sách tour. Vui lòng thử lại.'));
            })
        );
    }

    getScheduleById(id: number): Observable<TourSchedule> {
        return this.http.get<{ data: TourSchedule }>(this.baseUrl + 'TourSchedule/' + id).pipe(
            map((res) => {
                return res.data;
            })
        );
    }

    getSchedulesByTourId(tourId: number): Observable<TourSchedule[]> {
        return this.http.get<{ data: TourSchedule[] }>(this.baseUrl + 'TourSchedule/by-tourId/' + tourId).pipe(
            map((res) => {
                return res.data;
            })
        );
    }

    addSchedule(title: string, description: string, tourId: number): Observable<ApiResponse<TourSchedule>> {
        return this.http.post<ApiResponse<TourSchedule>>(this.baseUrl + 'TourSchedule/create-schedule', { title, description, tourId });
    }

    editSchedule(id: number, title: string, description: string, tourId: number): Observable<ApiResponse<TourSchedule>> {
        return this.http.post<ApiResponse<TourSchedule>>(this.baseUrl + 'TourSchedule/' + id, { title, description, tourId });
    }
    deleteSchedule(id: number): Observable<ApiResponse<TourSchedule>> {
        return this.http.delete<ApiResponse<TourSchedule>>(this.baseUrl + 'TourSchedule/' + id);
    }

    getStartDateById(id: number): Observable<TourStartDate> {
        return this.http.get<{ data: TourStartDate }>(this.baseUrl + 'TourStartDate/' + id).pipe(
            map((res) => {
                return res.data;
            })
        );
    }

    getStartDatesByTourId(tourId: number): Observable<TourStartDate[]> {
        return this.http.get<{ data: TourStartDate[] }>(this.baseUrl + 'TourStartDate/by-tourId/' + tourId).pipe(
            map((res) => {
                return res.data;
            })
        );
    }

    addStartDate(availableSlots: number, startDate: Date, tourId: number): Observable<ApiResponse<TourStartDate>> {
        return this.http.post<ApiResponse<TourStartDate>>(this.baseUrl + 'TourStartDate/create-start-date', { availableSlots, startDate, tourId });
    }

    editStartDate(id: number, availableSlots: number, startDate: Date, tourId: number): Observable<ApiResponse<TourStartDate>> {
        return this.http.post<ApiResponse<TourStartDate>>(this.baseUrl + 'TourStartDate/' + id, { availableSlots, startDate, tourId });
    }
    deleteStartDate(id: number): Observable<ApiResponse<TourStartDate>> {
        return this.http.delete<ApiResponse<TourStartDate>>(this.baseUrl + 'TourStartDate/' + id);
    }

    private formatDate(date: Date | string): string {
        if (typeof date === 'string') {
            return date;
        }
        const d = new Date(date);
        return d.toISOString().split('T')[0]; // Trả về YYYY-MM-DD
    }
}
