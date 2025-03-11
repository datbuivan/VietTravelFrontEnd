import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TourService {
    tours = [
        {
            id: 1,
            name: 'Tour Đà Nẵng - Hội An 3N2Đ',
            price: 3500000,
            location: 'Đà Nẵng, Hội An',
            duration: '3 ngày 2 đêm',
            rating: 4.8,
            image: 'images/uploadImage/hochiminhcity.jpg',
            amenities: ['Vé máy bay', 'Khách sạn 4*', 'Hướng dẫn viên', 'Ăn uống']
        },
        {
            id: 2,
            name: 'Tour Phú Quốc 4N3Đ',
            price: 5500000,
            location: 'Phú Quốc',
            duration: '4 ngày 3 đêm',
            rating: 4.7,
            image: 'images/uploadImage/haiphongcity.jpg',
            amenities: ['Vé máy bay', 'Resort 5*', 'Ăn uống', 'Lặn biển']
        },
        {
            id: 3,
            name: 'Tour Hà Nội - Hạ Long 2N1Đ',
            price: 2800000,
            location: 'Hà Nội, Hạ Long',
            duration: '2 ngày 1 đêm',
            rating: 4.5,
            image: 'images/uploadImage/vinhHaLong.jpg',
            amenities: ['Xe du lịch', 'Tham quan Vịnh Hạ Long', 'Ngủ đêm trên du thuyền']
        }
    ];

    constructor(private http: HttpClient) {}
    getTour(id: number): any {
        return this.tours.find((tour) => tour.id === id);
    }
    getTours(): any[] {
        return this.tours;
    }
}
