import { Component } from '@angular/core';

@Component({
    selector: 'app-overview',
    imports: [],
    standalone: true,
    template: `
        <div>
            <h3 class="text-center font-bold mb-6 uppercase">Thông tin thêm về chuyến đi</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="flex flex-col gap-2">
                    <i class="pi pi-map text-2xl"></i>
                    <div class="font-bold text-lg">Điểm tham quan</div>
                    <p class="text-ellipsis overflow-hidden">Hà Nội, Quảng Ninh, Ninh Bình</p>
                </div>
                <div class="flex flex-col gap-2">
                    <i class="pi pi-apple text-2xl"></i>
                    <div class="font-bold text-lg">Ẩm thực</div>
                    <p>Theo thực đơn</p>
                </div>
                <div class="flex flex-col gap-2">
                    <i class="pi pi-users text-2xl"></i>
                    <div class="font-bold text-lg">Đối tượng thích hợp</div>
                    <p>Người lớn tuổi, Cặp đôi, Gia đình nhiều thế hệ, Thanh niên</p>
                </div>
                <div class="flex flex-col gap-2">
                    <i class="pi pi-clock text-2xl"></i>
                    <div class="font-bold text-lg">Thời gian lý tưởng</div>
                    <p>Quanh năm</p>
                </div>
                <div class="flex flex-col gap-2">
                    <i class="pi pi-car text-2xl"></i>
                    <div class="font-bold text-lg">Phương tiện</div>
                    <p>Máy bay, Xe du lịch</p>
                </div>
                <div class="flex flex-col gap-2">
                    <i class="pi pi-dollar text-2xl"></i>
                    <div class="font-bold text-lg">Khuyến mãi</div>
                    <p>Đã bao gồm ưu đãi trong giá tour</p>
                </div>
            </div>
        </div>
    `
})
export class OverviewComponent {}
