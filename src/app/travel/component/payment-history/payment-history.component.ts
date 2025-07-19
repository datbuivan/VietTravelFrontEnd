import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PaymentHistoryService } from '@app/services/user/payment-history.service';
import { PaymentHistory } from '@app/shared/models/payment-history';
import { VndCurrencyPipe, VndPipe } from '@app/shared/pipes/vnd.pipe';
import { TimelineModule } from 'primeng/timeline';

@Component({
    selector: 'app-payment-history',
    standalone: true,
    imports: [CommonModule, TimelineModule, VndCurrencyPipe],
    templateUrl: './payment-history.component.html',
    styleUrl: './payment-history.component.scss'
})
export class PaymentHistoryComponent implements OnInit {
    events: PaymentHistory[] = [];
    constructor(private paymentHistortyService: PaymentHistoryService) {}

    ngOnInit() {
        this.paymentHistortyService.getPaymentHistory().subscribe({
            next: (res) => {
                this.events = res;
            },
            error: (error) => {
                console.error('Lỗi khi lấy lịch sử thanh toán:', error);
            }
        });
    }
}
