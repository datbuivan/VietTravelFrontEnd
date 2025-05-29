import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    private bookingData: { tourId: number | null; startDateId: number | null } = { tourId: null, startDateId: null };

    setBookingData(tourId: number, startDateId: number) {
        this.bookingData = { tourId, startDateId };
    }

    getBookingData() {
        return this.bookingData;
    }
    constructor() {}
}
