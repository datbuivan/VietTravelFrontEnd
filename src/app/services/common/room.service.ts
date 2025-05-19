import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '@environments/environment';
import { Room } from '@shared/models/room';

@Injectable({
    providedIn: 'root'
})
export class RoomService {
    baseUrl = environment.apiUrl;
    rooms: Room[] = [];
    constructor(private http: HttpClient) {}
    getRoomByHotelId(id: number) {
        const roomsByHotelId = this.rooms.find((room) => room.hotelId === id);
        if (roomsByHotelId) {
            return of(roomsByHotelId);
        }
        return this.http.get<Room[]>(this.baseUrl + 'room/' + id);
    }
    getRooms() {
        return this.http.get<Room[]>(this.baseUrl + 'room');
    }
}
