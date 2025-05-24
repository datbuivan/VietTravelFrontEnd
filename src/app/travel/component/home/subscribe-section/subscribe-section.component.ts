import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-subscribe-section',
    standalone: true,
    imports: [FormsModule, InputTextModule, ButtonModule],
    template: `
        <section class="subscribe-section relative h-80 flex items-center justify-center text-center text-white">
            <img src="images/banner/subscribe.jpg" alt="Subscribe Background" class="absolute inset-0 w-full h-full object-cover" />
            <div class="absolute inset-0 bg-black opacity-20"></div>
            <div class="relative z-10 w-full max-w-2xl mx-auto px-4">
                <h2 class="text-3xl font-bold mb-4 text-white">ĐĂNG KÝ NHẬN THÔNG TIN MỚI NHẤT</h2>
                <div class="flex flex-col md:flex-row justify-center items-center gap-4">
                    <input type="text" pInputText placeholder="Nhập Email" [(ngModel)]="email" class="p-inputtext-lg w-full md:w-1/2 rounded-full p-3 border-none" />
                    <p-button label="Đăng ký" styleClass="p-button-danger rounded-full px-6 py-3" (click)="onSubscribe()"></p-button>
                </div>
            </div>
        </section>
    `,
    styles: []
})
export class SubscribeSectionComponent {
    email: string = '';

    onSubscribe() {
        console.log('Subscribed with email:', this.email);
        this.email = ''; // Reset input sau khi đăng ký
    }
}
