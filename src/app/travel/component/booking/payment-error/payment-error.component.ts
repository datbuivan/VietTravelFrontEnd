import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-payment-error',
    standalone: true,
    imports: [ButtonModule],
    template: `
        <div class="flex flex-col items-center bg-white justify-center min-h-screen">
            <!-- Thông báo thành công -->
            <div class="w-full max-w-md text-center bg-white rounded-lg">
                <i class="pi pi-check-circle text-4xl text-green-500 mb-4"></i>
                <h2 class="text-xl font-bold">{{ successMessage }}</h2>
            </div>

            <!-- Nút quay lại -->
            <p-button label="Quay lại trang chủ" icon="pi pi-home" styleClass="p-button-primary mt-6" (onClick)="goToHome()"></p-button>
        </div>
    `
})
export class PaymentErrorComponent {
    successMessage: string = 'Thanh toán thất bại!';

    constructor(private router: Router) {}
    goToHome(): void {
        this.router
            .navigate(['/'])
            .then(() => {
                console.log('Navigated to home page');
            })
            .catch((err) => {
                console.error('Navigation error:', err);
            });
    }
}
