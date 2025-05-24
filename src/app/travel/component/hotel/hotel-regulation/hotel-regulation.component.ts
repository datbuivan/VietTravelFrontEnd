import { Component } from '@angular/core';

@Component({
    selector: 'app-hotel-regulation',
    imports: [],
    standalone: true,
    template: `
        <div class="w-full">
            <h3 class="text-center font-bold mb-8 uppercase">Quy định chỗ nghỉ</h3>
            <div class="w-full rounded-2xl border p-8">
                <div class="w-full flex flex-col gap-4">
                    <div class="w-full flex flex-col gap-1 justify-start items-start">
                        <label class="font-bold text-left text-xl">Trẻ em và giường phụ</label>
                        <p class="text-lg m-0 font-medium text-justify">Giường phụ tùy thuộc vào loại phòng bạn chọn, xin vui lòng kiểm tra thông tin phòng để biết thêm chi tiết.</p>
                        <p class="text-lg m-0 font-medium text-justify">Tất cả trẻ em đều được chào đón.</p>
                        <div class="w-full flex justify-start items-stretch gap-4">
                            <div class="w-1/3 border rounded-xl">
                                <div class="w-full bg-blue-900 text-white font-bold text-xl p-4 item-center text-center">
                                    <span>Độ tuổi trẻ em: 0 - 5 tuổi</span>
                                </div>
                                <div class="w-full px-8 py-4">
                                    <p><span>Ở miễn phí nếu sử dụng giường có sẵn</span></p>
                                    <p><span>Ở miễn phí nếu sử dụng giường có sẵn</span></p>
                                </div>
                            </div>
                            <div class="w-1/3 border rounded-xl">
                                <div class="w-full bg-blue-900 text-white font-bold text-xl p-4 item-center text-center">
                                    <span>Độ tuổi trẻ em: 0 - 5 tuổi</span>
                                </div>
                                <div class="w-full px-8 py-4">
                                    <p><span>Ở miễn phí nếu sử dụng giường có sẵn</span></p>
                                    <p><span>Ở miễn phí nếu sử dụng giường có sẵn</span></p>
                                </div>
                            </div>
                            <div class="w-1/3 border rounded-xl">
                                <div class="w-full bg-blue-900 text-white font-bold text-xl p-4 item-center text-center">
                                    <span> > 6 tuổi tính là người lớn</span>
                                </div>
                                <div class="w-full px-8 py-4">
                                    <p><span>Ở miễn phí nếu sử dụng giường có sẵn</span></p>
                                    <p><span>Ở miễn phí nếu sử dụng giường có sẵn</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-full flex flex-col gap-1 justify-start items-start">
                        <label class="font-bold text-left text-xl">Quy định hủy phòng</label>
                        <p class="text-lg m-0 font-medium text-justify">
                            Đơn đặt phòng này không hoàn tiền và không thể nào thay đổi hoặc chỉnh sửa được. Không đến khách sạn hoặc chỗ nghỉ sẽ được giải quyết như là Vắng Mặt và sẽ phải trả một khoản tiền là 100% giá trị đặt phòng (Quy định của
                            khách sạn)..
                        </p>
                    </div>
                    <div class="w-full flex flex-col gap-1 justify-start items-start">
                        <label class="font-bold text-left text-xl">Quy định khác</label>
                        <ul class="list-outside">
                            <li class="text-lg m-0 font-medium text-justify">Đối với đặt phòng trả tiền tại khách sạn, khách cần liên hệ chỗ nghỉ trước để xác nhận thời gian nhận phòng. Nếu không, chỗ nghỉ có thể bác bỏ việc đặt phòng.</li>
                            <li class="text-lg m-0 font-medium text-justify">Khi đặt trên 5 phòng, chính sách và điều khoản bổ sung có thể được áp dụng.</li>
                        </ul>
                    </div>
                    <div class="w-full flex flex-col gap-1 justify-start items-start">
                        <label>
                            <span>Lưu ý của khách sạn</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class HotelRegulationComponent {}
