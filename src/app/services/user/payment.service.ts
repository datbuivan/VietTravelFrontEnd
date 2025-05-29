import { ApiResponse } from './../../shared/models/api-response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentRespone } from '@app/shared/models/payment-response';
import { environment } from '@environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PaymentService {
    baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    generatePaymentUrl(totalPrice: number, type: number, userId: string, adults: number, children: number, tourId: number, tourStartDateId: number): Observable<PaymentRespone> {
        return this.http.post<{ data: PaymentRespone }>(this.baseUrl + 'BookingPayment/create-payment', { totalPrice, type, userId, adults, children, tourId, tourStartDateId }).pipe(map((response) => response.data));
    }
}
