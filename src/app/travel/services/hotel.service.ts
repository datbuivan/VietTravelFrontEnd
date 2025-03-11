import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HotelService {
    hotels = [
        {
            id: 1,
            name: 'May De Ville Lakeside Hotel',
            location: 'Hà Nội, Việt Nam',
            rating: 4.5,
            reviews: 320,
            image: 'images/uploadImage/phuquochotel.jpg'
        },
        {
            id: 2,
            name: 'Vinpearl Resort Phú Quốc',
            location: 'Phú Quốc, Việt Nam',
            rating: 5.0,
            reviews: 1024,
            image: 'images/uploadImage/phuquochotel.jpg'
        }
    ];

    constructor(private http: HttpClient) {}
    getHotel(id: number): any {
        return this.hotels.find((hotel) => hotel.id === id);
    }
    getHotels(): any[] {
        return this.hotels;
    }
}
