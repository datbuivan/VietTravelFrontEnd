import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PaymentHistoryService } from '@app/services/user/payment-history.service';
import { PaymentService } from '@app/services/user/payment.service';
import { PaymentHistory } from '@app/shared/models/payment-history';
import { VndCurrencyPipe } from '@app/shared/pipes/vnd.pipe';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { Table, TableModule } from 'primeng/table';

@Component({
    selector: 'app-payment-management',
    standalone: true,
    imports: [CommonModule, TableModule, SelectModule, IconFieldModule, RouterModule, InputIconModule, FormsModule, VndCurrencyPipe, InputTextModule],
    templateUrl: './payment-management.component.html',
    styleUrl: './payment-management.component.scss'
})
export class PaymentManagementComponent {
    @ViewChild('dt1') dt1!: Table;
    payments: PaymentHistory[] = [];
    statusOptions = [
        { label: 'Tất cả', value: 'All' },
        { label: 'Đang chờ', value: 'Pending' },
        { label: 'Thất bại', value: 'Fail' },
        { label: 'Hoàn thành', value: 'Completed' }
    ];

    selectedStatus: string = 'All';

    constructor(private paymentHistoryService: PaymentHistoryService) {}

    ngOnInit(): void {
        this.loadPayments();
    }

    loadPayments(): void {
        const status = this.selectedStatus !== 'All' ? this.selectedStatus : undefined;
        this.paymentHistoryService.getAllPaymentHistory(status).subscribe({
            next: (data) => (this.payments = data),
            error: (err) => console.error('Error loading payments:', err)
        });
    }

    onGlobalFilter(table: Table, event: Event): void {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    onStatusFilter(table: Table, event: any): void {
        this.selectedStatus = event.value || 'All';
        this.loadPayments();
    }
    clearFilter(table: Table): void {
        table.clear();
        this.selectedStatus = 'All';
    }
}
