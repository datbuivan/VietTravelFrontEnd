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
    hotel!: Hotel;

    hotelParams = new Params();
    constructor(private http: HttpClient) {}
    getHotel(id: number): Observable<Hotel> {
        const city = this.hotels.find((p) => p.id === id);
        if (city) {
            return of(city);
        }
        return this.http.get<{ data: Hotel }>(this.baseUrl + 'hotel/' + id).pipe(
            map((res) => {
                const hotel = res.data;
                this.hotels.push(hotel);
                return hotel;
            })
        );
    }

    getHotels(): Observable<Hotel[]> {
        if (this.hotels.length > 0) {
            return of(this.hotels);
        }
        return this.http.get<{ data: Hotel[] }>(this.baseUrl + 'hotel').pipe(
            map((res) => {
                this.hotels = res.data;
                return this.hotels;
            })
        );
    }
}
