import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/shared/models/api-response';
import { PaymentHistory } from '@app/shared/models/payment-history';
import { environment } from '@environments/environment';
import { map, Observable, switchMap } from 'rxjs';
import { AuthService } from '../common/auth.service';

@Injectable({
    providedIn: 'root'
})
export class PaymentHistoryService {
    baseUrl = environment.apiUrl;

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {}

    // getPaymentHistory(userId: string): Observable<PaymentHistory[]> {
    //     const headers = this.authService.getAuthHeaders();
    //     return this.http.get<{ data: PaymentHistory[] }>(`${this.baseUrl}Payment/history/${userId}`, { headers }).pipe(map((res) => res.data));
    // }

    getPaymentHistory(): Observable<PaymentHistory[]> {
        return this.authService.getCurrentUser().pipe(
            switchMap((user) => {
                if (!user.id) {
                    throw new Error('Không tìm thấy userId trong thông tin người dùng');
                }
                const headers = this.authService.getAuthHeaders();
                return this.http.get<{ data: PaymentHistory[] }>(`${this.baseUrl}Payment/history/${user.id}`, { headers }).pipe(map((res) => res.data));
            })
        );
    }

    getAllPaymentHistory(status?: string): Observable<PaymentHistory[]> {
        const headers = this.authService.getAuthHeaders();
        const url = status && ['Pending', 'Fail', 'Completed'].includes(status) ? `${this.baseUrl}Payment/all?status=${status}` : `${this.baseUrl}Payment/all`;
        return this.http.get<{ data: PaymentHistory[] }>(url, { headers }).pipe(map((res) => res.data));
    }
}
