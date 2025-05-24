import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from '@environments/environment';
import { Hotel } from '@shared/models/hotel';
import { Params } from '@shared/models/params';

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

    getHotels(): Observable<Hotel[]> {
        return this.http.get<{ data: Hotel[] }>(this.baseUrl + 'hotel').pipe(
            map((res) => {
                this.hotels = res.data;
                return this.hotels;
            })
        );
    }
}
