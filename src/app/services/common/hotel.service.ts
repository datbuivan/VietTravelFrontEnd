import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { environment } from '@environments/environment';
import { Hotel } from '@shared/models/hotel';
import { Params } from '@shared/models/params';
import { HotelSpecParams } from '@app/shared/models/hotel-params';
import { ApiResponse } from '@app/shared/models/api-response';

@Injectable({
    providedIn: 'root'
})
export class HotelService {
    baseUrl = environment.apiUrl;

    hotels: Hotel[] = [];
    hotel: Hotel | null = null;

    hotelParams = new Params();
    constructor(private http: HttpClient) {}
    getHotel(id: number): Observable<Hotel> {
        return this.http.get<{ data: Hotel }>(this.baseUrl + 'hotel/' + id).pipe(
            map((res) => {
                this.hotel = res.data;
                return this.hotel;
            })
        );
    }

    getHotelsWithSpec(params: HotelSpecParams): Observable<Hotel[]> {
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
        return this.http.get<ApiResponse<Hotel[]>>(this.baseUrl + 'Hotel/spec-params', { params: httpParams }).pipe(
            map((response) => {
                return response.data || [];
            }),
            catchError((error) => {
                console.error('Lỗi khi lấy danh sách hotel:', error);
                return throwError(() => new Error('Không thể lấy danh sách hotel. Vui lòng thử lại.'));
            })
        );
    }

    getHotels(): Observable<Hotel[]> {
        return this.http.get<{ data: Hotel[] }>(this.baseUrl + 'hotel').pipe(
            map((res) => {
                this.hotels = res.data;
                return this.hotels;
            })
        );
    }
    private formatDate(date: Date | string): string {
        if (typeof date === 'string') {
            return date;
        }
        const d = new Date(date);
        return d.toISOString().split('T')[0]; // Trả về YYYY-MM-DD
    }
}
