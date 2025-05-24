import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [RouterModule],
    template: `
        <footer class="mx-auto mb-4 grid max-w-2xl gap-x-10 lg:gap-x-12 px-4 sm:grid-cols-1 sm:pb-6 md:grid-cols-4 lg:max-w-6xl lg:px-8">
            <div class="flex flex-wrap items-center justify-between md:justify-around gap-y-4 md:flex-col">
                <div class="flex items-center">
                    <img alt="logo" fetchpriority="high" class="h-8 lg:h-10 w-auto object-cover" src="/images/icon/logo.png" />
                    <span style="font-family: 'Pacifico', cursive; font-size: 1.2rem; font-weight: 600">Viet Travel</span>
                </div>
                <p class="text-center text-xs text-[#101010]">© 2025 viettravel. All rights reserved.</p>
                <div class="flex gap-4">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <i class="pi pi-facebook" style="font-size: 1.5rem; margin-right: 0.5rem;"></i>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <i class="pi pi-instagram" style="font-size: 1.5rem; margin-right: 0.5rem;"></i>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <i class="pi pi-twitter" style="font-size: 1.5rem;"></i>
                    </a>
                </div>
            </div>

            <!-- Cột 2: Khám phá -->
            <div class="mt-6 md:mt-0">
                <h2 class="font-semibold md:mb-6 md:text-lg">Khám phá</h2>
                <div class="flex gap-4 text-sm text-gray-600 md:flex-col md:text-base">
                    <a routerLink="/">Trang chủ</a>
                    <a routerLink="/about">Giới thiệu</a>
                    <a routerLink="/tour">Điểm đến</a>
                </div>
            </div>

            <!-- Cột 3: Liên kết nhanh -->
            <div class="mt-6 md:mt-0">
                <h2 class="mb-2 font-semibold md:mb-6 md:text-lg">Liên kết nhanh</h2>
                <div class="flex gap-4 text-sm text-gray-600 md:flex-col md:text-base">
                    <a routerLink="/gallery">Gallery</a>
                    <a routerLink="/blog">Blog</a>
                    <a routerLink="/contact">Liên hệ</a>
                </div>
            </div>

            <!-- Cột 4: Liên hệ -->
            <div class="mt-6 md:mt-0">
                <h2 class="mb-2 font-semibold md:mb-6 md:text-lg">Liên hệ</h2>
                <div class="flex gap-4 text-sm text-gray-600 md:flex-col md:text-base">
                    <p>Email: viettravel&#64;gmail.com</p>
                    <p>Phone: 0123456789</p>
                </div>
            </div>
        </footer>
    `
})
export class AppFooter {}
