import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-payment-success',
    standalone: true,
    imports: [ButtonModule, CardModule],
    template: `
        <div class="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
            <!-- Card with animation -->
            <p-card [@fadeIn] class="w-full max-w-lg shadow-xl rounded-2xl overflow-hidden bg-white/90 backdrop-blur-sm">
                <div class="p-8 text-center">
                    <!-- Success icon with scale animation -->
                    <div class="relative mb-6">
                        <i class="pi pi-check-circle text-6xl text-green-500 animate-pulse"></i>
                        <div class="absolute inset-0 flex items-center justify-center">
                            <div class="w-16 h-16 rounded-full bg-green-100 animate-ping"></div>
                        </div>
                    </div>

                    <!-- Success message -->
                    <h2 class="text-2xl font-bold text-gray-800 mb-4">{{ successMessage }}</h2>
                    <p class="text-gray-600 mb-6">Cảm ơn bạn đã thanh toán! Đơn hàng của bạn đã được xử lý thành công.</p>

                    <!-- Back to home button -->
                    <p-button label="Quay lại trang chủ" icon="pi pi-home" styleClass="p-button-raised p-button-primary w-full sm:w-auto" (onClick)="goToHome()"></p-button>
                </div>
            </p-card>
        </div>
    `,
    animations: [trigger('fadeIn', [transition(':enter', [style({ opacity: 0, transform: 'translateY(20px)' }), animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))])])],
    styles: [
        `
            :host {
                display: block;
            }
            .animate-pulse {
                animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }
            .animate-ping {
                animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
            }
            @keyframes pulse {
                0%,
                100% {
                    opacity: 1;
                }
                50% {
                    opacity: 0.5;
                }
            }
            @keyframes ping {
                75%,
                100% {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `
    ]
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
