import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-payment-success',
    standalone: true,
    imports: [ButtonModule],
    template: `
        <div class="p-4 flex flex-col bg-white items-center justify-center min-h-screen ">
            <!-- Thông báo thành công -->
            <div class="card w-full max-w-md text-center p-6 bg-white rounded-lg">
                <i class="pi pi-check-circle text-4xl text-green-500 mb-4"></i>
                <h2 class="text-xl font-bold">{{ successMessage }}</h2>
            </div>

            <!-- Nút quay lại -->
            <p-button label="Quay lại trang chủ" icon="pi pi-home" styleClass="p-button-primary mt-6" (onClick)="goToHome()"></p-button>
        </div>
    `
})
export class PaymentSuccessComponent {
    successMessage: string = 'Thanh toán thành công!';

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
