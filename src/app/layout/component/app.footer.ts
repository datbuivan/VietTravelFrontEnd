import { InputTextModule } from 'primeng/inputtext';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    standalone: true,
    selector: 'app-footer',
    styleUrls: ['./app.footer.scss'],
    imports: [ButtonModule, InputTextModule],
    template: `<div class="layout-footer lg:px-24 md:px-24 sm:px-24 pt-16 bg-blue-200">
        <div class="grid lg:grid-cols-4 md:grid-cols-4 lg:gap-4 md:gap-4 grid-cols-1 flex ">
            <div class="lg:col-span-1 md:col-span-1 sm:col-span-1 lg:col-start-1 md:col-start-1 sm:col-start-1">
                <div class="w-full pb-4">
                    <span class=" font-bold text-lg">Du lịch trong nước</span>
                </div>
                <div class="grid grid-cols-2 gap-2 w-full">
                    <div class="col-span-1 pb-4">
                        <span>Hà Nội</span>
                    </div>
                    <div class="col-span-1 pb-4">
                        <span>Huế</span>
                    </div>
                    <div class="col-span-1 pb-4">
                        <span>Hạ Long</span>
                    </div>
                    <div class="col-span-1 pb-4">
                        <span>Quảng Bình</span>
                    </div>
                    <div class="col-span-1 pb-4">
                        <span>Đà Nẵng</span>
                    </div>
                    <div class="col-span-1 pb-4">
                        <span> Quảng Nam</span>
                    </div>
                    <div class="col-span-1 pb-4">
                        <span>Phan Thiết</span>
                    </div>
                    <div class="col-span-1 pb-4">
                        <span> Hà Giang</span>
                    </div>
                </div>
            </div>
            <div class="lg:col-span-1 md:col-span-1 sm:col-span-1 lg:col-start-2 md:col-start-2 sm:col-start-1">
                <div class="w-full pb-4">
                    <span class="font-bold text-lg">Du lịch nước ngoài</span>
                </div>
                <div class="grid grid-cols-2 gap-2 w-full">
                    <div class="col-span-1 pb-4">
                        <span>Trung Quốc</span>
                    </div>
                    <div class="col-span-1 pb-4">
                        <span>Thái Lan</span>
                    </div>
                    <div class="col-span-1 pb-4">
                        <span>Malaysia</span>
                    </div>
                    <div class="col-span-1 pb-4">
                        <span>Singapore</span>
                    </div>
                    <div class="col-span-1 pb-4">
                        <span>Úc</span>
                    </div>
                    <div class="col-span-1 pb-4">
                        <span> Hoa Kỳ</span>
                    </div>
                    <div class="col-span-1 pb-4">
                        <span>Nhật Bản</span>
                    </div>
                    <div class="col-span-1 pb-4">
                        <span>Nga</span>
                    </div>
                </div>
            </div>
            <div class="lg:col-span-2 md:col-span-2 sm:col-span-1 lg:col-start-3 md:col-start-3 sm:col-start-1">
                <div class="w-full ">
                    <span class="font-bold text-lg">Tra cứu Booking</span>
                </div>
                <div class="w-full flex pb-4">
                    <div class="w-3/5 flex flex-col h-10 mr-4">
                        <input pInputText type="text" class="rounded-lg" placeholder="Nhập mã booking của quý khác" />
                    </div>
                    <div class="w-2/5 h-10">
                        <p-button label="Tìm kiếm" variant="outlined" severity="contrast"><i class="pi pi-search mr-2"></i></p-button>
                    </div>
                </div>
            </div>
            <div class="lg:col-span-1 md:col-span-1 sm:col-span-1 lg:col-start-1 md:col-start-1 sm:col-start-1">
                <div class="w-full pb-4">
                    <span class="font-bold text-lg">Liên hệ</span>
                </div>
                <div class="w-full pb-4">
                    <span>190 Pasteur, Phường Võ Thị Sáu, Quận 3, TP.HCM</span>
                </div>
                <div class="w-full pb-4">
                    <span>(+84 28) 3822 8898</span>
                </div>
                <div class="w-full pb-4">
                    <span>(+84 28) 3829 9142</span>
                </div>
                <div class="w-full pb-4">
                    <span>info:&#64;vietravel.com</span>
                </div>
                <div class="grid grid-cols-5 gap-2 lg:w-1/3 md:w-2/3 pb-4 ">
                    <div class="col-span-1 pi pi-instagram"></div>
                    <div class="col-span-1 pi pi-tiktok"></div>
                    <div class="col-span-1 pi pi-whatsapp"></div>
                    <div class="col-span-1 pi pi-telegram"></div>
                    <div class="col-span-1 pi pi-facebook"></div>
                </div>
                <div class="lg:w-1/3 md:w-2/3 bg-red-500 flex h-10 rounded-lg items-center justify-item-center mb-4">
                    <div class="w-1/3 p-2"><i class="pi pi-whatsapp"></i></div>
                    <div class="w-2/3 flex"><span class="w-full text-white">1900 1839</span></div>
                </div>
                <div class="w-full">
                    <span>Từ 8:00 - 23:00 hằng ngày</span>
                </div>
            </div>
            <div class="lg:col-span-1 md:col-span-1 sm:col-span-1 lg:col-start-2 md:col-start-2 sm:col-start-1">
                <div class="w-full pb-4">
                    <span class="font-bold text-lg">Thông tin</span>
                </div>
                <div class="w-full pb-4">
                    <span>Khảo sát tỷ lệ đạt visa</span>
                </div>
                <div class="w-full pb-4">
                    <span>Tạp chí du lịch</span>
                </div>
                <div class="w-full pb-4">
                    <span>Tin tức</span>
                </div>
                <div class="w-full pb-4">
                    <span>Sitemap</span>
                </div>
                <div class="w-full pb-4">
                    <span>Trợ giúp</span>
                </div>
                <div class="w-full pb-4">
                    <span>Chính sách riêng tư</span>
                </div>
                <div class="w-full pb-4">
                    <span>Thỏa thuận sử dụng</span>
                </div>
                <div class="w-full pb-4">
                    <span>Chính sách bảo vệ dữ liệu cá nhân</span>
                </div>
            </div>
            <div class="lg:col-span-1 md:col-span-1 sm:col-span-1 lg:col-start-3 md:col-start-3 sm:col-start-1">
                <div class="w-full ">
                    <span class="font-bold text-lg">Chứng nhận</span>
                </div>
            </div>
            <div class="lg:col-span-1 md:col-span-1 sm:col-span-1 lg:col-start-4 md:col-start-4 sm:col-start-1">
                <div class="w-full ">
                    <span class="font-bold text-lg">Chấp nhận thanh toán</span>
                </div>
            </div>
        </div>
    </div>`
})
export class AppFooter {}
