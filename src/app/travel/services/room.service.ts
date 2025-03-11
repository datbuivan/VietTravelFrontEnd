import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RoomService {
    rooms = [
        {
            id: 1,
            name: 'Phòng Tiêu chuẩn hướng thành phố',
            price: 7265538,
            amenities: ['Bữa sáng', 'Bãi đỗ xe', 'Nước uống chào đón', 'Cà phê & trà', 'Wifi miễn phí'],
            selected: false,
            hotelId: 1
        },
        {
            id: 2,
            name: 'Phòng Tiêu chuẩn hướng thành phố',
            price: 7265538,
            amenities: ['Bữa sáng', 'Bãi đỗ xe', 'Nước uống chào đón', 'Cà phê & trà', 'Wifi miễn phí'],
            selected: false,
            hotelId: 1
        },
        {
            id: 3,
            name: 'Phòng Tiêu chuẩn hướng thành phố',
            price: 7265538,
            amenities: ['Bữa sáng', 'Bãi đỗ xe', 'Nước uống chào đón', 'Cà phê & trà', 'Wifi miễn phí'],
            selected: false,
            hotelId: 2
        },
        {
            id: 4,
            name: 'Phòng Tiêu chuẩn hướng thành phố',
            price: 7265538,
            amenities: ['Bữa sáng', 'Bãi đỗ xe', 'Nước uống chào đón', 'Cà phê & trà', 'Wifi miễn phí'],
            selected: false,
            hotelId: 2
        }
    ];
    constructor(private http: HttpClient) {}
    getRoomByHotelId(id: number): any {
        return this.rooms.find((room) => room.hotelId === id);
    }
    getRooms(): any[] {
        return this.rooms;
    }
}
