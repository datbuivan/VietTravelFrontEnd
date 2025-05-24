import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Tour } from '@shared/models/tour';
import { environment } from '@environments/environment';
import { TourSchedule } from '@app/shared/models/tourSchedule';
import { ApiResponse } from '@app/shared/models/api-response';
import { TourStartDate } from '@app/shared/models/tourStartDate';

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
}
