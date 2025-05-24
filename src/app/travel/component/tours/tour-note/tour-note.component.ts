import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';

@Component({
    selector: 'app-tour-note',
    imports: [AccordionModule],
    standalone: true,
    styleUrls: ['./tour-note.component.scss'],
    template: `
        <div>
            <h3 class="text-center font-bold mb-6 uppercase">Những thông tin cần lưu ý</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <p-accordion>
                        <p-accordion-panel value="0">
                            <p-accordion-header>Giá tour bao gồm</p-accordion-header>
                            <p-accordion-content>
                                <div>
                                    - Xe tham quan (15, 25, 35, 45 chỗ tùy theo số lượng khách) theo chương trình
                                    <br />
                                    - Vé máy bay khứ hồi SGN-PQC-SGN
                                    <br />
                                    - Hành lý ký gửi 20kg/1 khách, xách tay 7kg/1 khách
                                    <br />
                                    - Khách sạn theo tiêu chuẩn 2 khách/phòng hoặc 3 khách/phòng
                                    <br />
                                    - Vé tham quan theo chương trình
                                    <br />
                                    - Hướng dẫn viên tiếng Việt nối tuyến
                                    <br />
                                    - Bảo hiểm du lịch với mức bồi thường cao nhất 120.000.000đ/vụ<br />- Nón Vietravel + Nước suối + Khăn lạnh
                                    <br />
                                    - Thuế VAT
                                    <br />
                                </div>
                            </p-accordion-content>
                        </p-accordion-panel>
                        <p-accordion-panel value="1">
                            <p-accordion-header>Giá tour không bao gồm</p-accordion-header>
                            <p-accordion-content>
                                <div>
                                    - Chi phí cá nhân: ăn uống ngoài chương trình, giặt ủi, chi phí hủy đổi hành trình và nâng hạng chuyến bay, hành lý quá cước, phụ thu phòng đơn,…
                                    <br />
                                    - Chi phí tham quan ngoài chương trình.
                                    <br />
                                </div>
                            </p-accordion-content>
                        </p-accordion-panel>
                        <p-accordion-panel value="2">
                            <p-accordion-header>Lưu ý giá trẻ em</p-accordion-header>
                            <p-accordion-content>
                                <div>
                                    - Chi phí cá nhân: ăn uống ngoài chương trình, giặt ủi, chi phí hủy đổi hành trình và nâng hạng chuyến bay, hành lý quá cước, phụ thu phòng đơn,…
                                    <br />
                                    - Chi phí tham quan ngoài chương trình.
                                    <br />
                                </div>
                            </p-accordion-content>
                        </p-accordion-panel>
                        <p-accordion-panel value="3">
                            <p-accordion-header>Điều kiện thanh toán</p-accordion-header>
                            <p-accordion-content>
                                <div>
                                    - Chi phí cá nhân: ăn uống ngoài chương trình, giặt ủi, chi phí hủy đổi hành trình và nâng hạng chuyến bay, hành lý quá cước, phụ thu phòng đơn,…
                                    <br />
                                    - Chi phí tham quan ngoài chương trình.
                                    <br />
                                </div>
                            </p-accordion-content>
                        </p-accordion-panel>
                        <p-accordion-panel value="4">
                            <p-accordion-header>Điều kiện đăng kí</p-accordion-header>
                            <p-accordion-content>
                                <div>
                                    - Khi đăng ký vui lòng cung cấp giấy tờ tùy thân tất cả người đi: Căn cước công dân/Hộ chiếu (Passport)/Giấy khai sinh (trẻ em dưới 14 tuổi). Trong trường hợp đăng ký trực tuyến qua www.travel.com.vn vui lòng nhập
                                    tên chính xác theo thứ tự: Họ/tên lót/tên xuất vé máy bay. Quý khách khi đăng ký cung cấp tên theo giấy tờ tùy thân nào, khi đi tour mang theo giấy tờ tùy thân đó.
                                    <br />
                                    - Quy định giấy tờ tùy thân khi đi tour:
                                    <br />
                                    - Khách quốc tịch Việt Nam: Trẻ em dưới 14 tuổi cần đem theo Giấy khai sinh bản chính/Hộ chiếu bản chính còn giá trị sử dụng. Trẻ em từ 14 tuổi trở lên và Người lớn cần đem theo căn cước công dân/ Hộ chiếu bản
                                    chính còn giá trị sử dụng. Lưu ý trẻ em trên 14 tuổi bắt buộc phải có căn cước công dân /Hộ chiếu làm thủ tục lên máy bay hoặc Giấy xác nhận nhân thân theo mẫu quy định và chỉ có giá trị trong vòng 30 ngày kể từ
                                    ngày xác nhận.
                                    <br />
                                    - Khách quốc tịch nước ngoài hoặc là Việt kiều: Khi đi tour vui lòng mang theo hộ chiếu bản chính (Passport) hoặc thẻ xanh kèm thị thực nhập cảnh (visa dán vào hộ chiếu hoặc tờ rời hoặc cuốn miễn thị thực, các loại
                                    giấy tờ này phải có dấu nhập cảnh Việt Nam và còn giá trị sử dụng theo quy định khi đi tour).
                                    <br />
                                    - Thông tin tập trung: Tại sân bay Tân Sơn Nhất, Ga đi trong nước, trước giờ bay 2 tiếng (áp dụng ngày thường), trước 2 tiếng 30 phút (áp dụng lễ tết). Trong trường hợp bay hãng hàng không Vietjet cột 5, trong
                                    trường hợp bay hãng hàng không Vietnam, Jetstar cột 12 Quầy Vietravel
                                    <br />
                                    - Thông tin hành lý khi đi tour, xách tay dưới 7kg/1khách - kích thước không quá: 56cm x 36cm x 23 cm, chất lỏng với thể tích không quá 100ml. Ký gửi 20kg/1khách - kích thước không quá: 119cm x 119cm x 81cm. Các
                                    vật phẩm không được chấp nhận dưới dạng hành lý ký gởi hoặc vận chuyển trong hành lý theo quy định hàng không
                                    <br />
                                    - Trong trường hợp Quý khách cung cấp tên sai, đến trễ giờ bay, vui lòng thanh toán phí đổi vé hoặc mua lại vé mới theo quy định của Hãng Hàng Không (nếu chuyến bay còn chỗ).
                                    <br />
                                    - Trong trường hợp Quý khách bay hãng hàng không Vietnam, Jetstar, Vietjet. Vé máy bay khuyến mãi không hoàn, không đổi, hủy, sai tên mất 100%. Vé Vietnam, Jetstar không bay chặng đi, tự động hủy chặng về.
                                    <br />
                                    - Do các chuyến bay phụ thuộc vào các hãng Hàng Không (Vietnam, Vietjet, Jetstar,..) nên trong một số trường hợp giá vé, chuyến bay, giờ bay có thể thay đổi mà không được báo trước. Tùy vào tình hình thực tế,
                                    chương trình và điểm tham quan có thể linh động thay đổi thứ tự các điểm phù hợp điều kiện giờ bay và thời tiết thực tế. Vietravel sẽ không chịu trách nhiệm bảo đảm các điểm tham quan trong trường hợp:<br />
                                    + Xảy ra thiên tai: bão lụt, hạn hán, động đất…<br />
                                    + Sự cố về an ninh: khủng bố, biểu tình<br />
                                    + Sự cố về hàng không: trục trặc kỹ thuật, an ninh, dời, hủy, hoãn chuyến bay.<br />Nếu những trường hợp trên xảy ra, Vietravel sẽ xem xét để hoàn trả chi phí không tham quan cho khách trong điều kiện có thể (sau
                                    khi đã trừ lại các dịch vụ đã thực hiện…. và không chịu trách nhiệm bồi thường thêm bất kỳ chi phí nào khác).<br />- Sau khi Quý khách đã làm thủ tục Hàng Không và nhận thẻ lên máy bay, đề nghị Quý khách giữ cẩn
                                    thận và lưu ý lên máy bay đúng giờ. Vietravel không chịu trách nhiệm trong trường hợp khách làm mất thẻ lên máy bay và không lên máy bay đúng theo giờ quy định của Hàng Không.<br />- Giờ nhận phòng &amp; trả phòng
                                    theo quy định khách sạn, nhận sau 14:00 giờ và trả trước 12:00 giờ.<br />- Phòng khách sạn/resort có thể xảy ra trường hợp phòng không gần nhau, không cùng tầng, loại phòng một giường đôi hoặc hai giường đơn không
                                    theo yêu cầu, tùy tình hình thực tế từng khách sạn/Resort.<br />- Trường hợp quý khách tham gia tour 01 khách, bắt buộc đóng thêm tiền phụ thu phòng đơn để ở riêng 01 phòng. Trường hợp trong đoàn cũng có khách đi
                                    01 mình, cùng giới tính và có nhu cầu muốn ghép cùng phòng với quý khách thì Vietravel sẽ hoàn lại tiền phụ thu phòng đơn cho quý khách.<br />- Trường hợp quý khách đi nhóm 03 khách, Vietravel sẽ cung cấp 01 phòng
                                    dành cho 03 khách là 01 giường lớn 1m6 và 01 giường phụ di động từ 0.8 - 1,2m (extrabed). Trong trường hợp quý khách có nhu cầu ở riêng, vui lòng đóng thêm tiền phụ thu phòng đơn theo quy định. <br />- Trong trường
                                    hợp Quý khách có yêu cầu nâng chuẩn loại phòng cao cấp hơn vui lòng liên hệ phụ trách tuyến &amp; thanh toán chí phát sinh tùy hạng phòng yêu cầu (nếu có). <br />- Đối với các chương trình tham quan biển đảo, trong
                                    trường hợp Quý khách không khỏe, có tiền sử bệnh hoặc có chất kích thích trong người (rượu, bia…) thì không nên tắm &amp; lặn biển để đảm bảo sự an toàn.<br />- Cam kết đã được tư vấn hiểu rõ và đồng ý các quy định
                                    liên quan về điều kiện sức khỏe khi tham gia chương trình du lịch. Khách nữ từ 55 tuổi trở lên và khách nam từ 60 trở lên: nên có người thân dưới 55 tuổi (đầy đủ sức khỏe) đi cùng. Riêng khách từ 70 tuổi trở lên:
                                    Bắt buộc phải có người thân dưới 55 tuổi (đầy đủ sức khỏe) đi cùng. Hạn chế nhận khách từ 80 tuổi trở lên. Khách từ 80 tuổi không có chế độ bảo hiểm. Quý khách mang thai vui lòng báo cho nhân viên bán tour ngay tại
                                    thời điểm đăng ký. Phải có ý kiến của bác sĩ trước khi đi tour, tự chịu trách nhiệm về sức khỏe của mình và thai nhi trong suốt thời gian tham gia chương trình du lịch. Khi đi tour phải mang theo sổ khám thai và
                                    giấy tờ tùy thân theo quy định hãng hàng không. Tuần thai từ 28 tuần trở đi phải mang theo giấy khám thai trong vòng 7 ngày trở lại. Cam kết bản thân và người thân hoàn toàn có đủ sức khỏe để đi du lịch theo chương
                                    trình. Đồng ý miễn trừ toàn bộ trách nhiệm pháp lý, không khiếu nại, không yêu cầu bồi thường đối với Vietravel nói chung và nhân viên Vietravel nói riêng về tất cả các vấn đề xảy ra liên quan đến tình trạng sức
                                    khỏe của khách hàng khi tham gia tour hoặc sử dụng các dịch vụ do Vietravel cung cấp. Quý khách cam kết tự chịu mọi chi phí phát sinh ngoài chương trình tour liên quan đến việc giải quyết các rủi ro về sức khỏe
                                    (lưu trú, vận chuyển, chi phí khám chữa bệnh...) – ngoại trừ các chi phí thuộc hạng mục bảo hiểm sẽ do Công ty Bảo hiểm hoàn trả theo quy định.<br />- Quý khách có nhu cầu cần xuất hóa đơn vui lòng cung cấp thông
                                    tin xuất hóa đơn cho nhân viên bán tour khi ngay khi đăng ký hoặc trước khi thanh toán hết, không nhận xuất hóa đơn sau khi tour đã kết thúc. <br />- Quý khách vui lòng đọc kỹ chương trình, giá tour, các khoản bao
                                    gồm cũng như không bao gồm trong chương trình, các điều kiện hủy tour trên biên nhận đóng tiền. Tùy thời điểm đăng ký, kênh bán, giá tour có thể thay đổi. Trong trường hợp Quý khách không trực tiếp đến đăng ký tour
                                    mà do người khác đến đăng ký thì Quý khách vui lòng tìm hiểu kỹ chương trình từ người đăng ký cho mình.
                                    <br />
                                </div>
                            </p-accordion-content>
                        </p-accordion-panel>
                    </p-accordion>
                </div>
                <div>
                    <p-accordion>
                        <p-accordion-panel value="0">
                            <p-accordion-header>Lưu ý về chuyển hoặc hủy tour</p-accordion-header>
                            <p-accordion-content>
                                <div>
                                    - Sau khi đóng tiền, nếu Quý khách muốn chuyển/huỷ tour xin vui lòng mang Vé Du Lịch đến văn phòng đăng ký tour để làm thủ tục chuyển/huỷ tour và chịu mất phí theo quy định của Vietravel. Không giải quyết các
                                    trường hợp liên hệ chuyển/huỷ tour qua điện thoại.
                                </div>
                            </p-accordion-content>
                        </p-accordion-panel>
                        <p-accordion-panel value="1">
                            <p-accordion-header>Các điều kiện hủy tour đối với ngày thường</p-accordion-header>
                            <p-accordion-content>
                                <div>
                                    - Được chuyển sang các tuyến du lịch khác trước ngày khởi hành 20 ngày : Không mất chi phí. <br />- Nếu hủy hoặc chuyển sang các chuyến du lịch khác ngay sau khi đăng ký đến 19 ngày trước ngày khởi hành: Chi phí
                                    hủy tour: 50% tiền cọc tour. <br />- Nếu hủy hoặc chuyển sang các chuyến du lịch khác từ 12-14 ngày trước ngày khởi hành: Chi phí hủy tour: 100% tiền cọc tour.
                                    <br />
                                    <br />
                                    <br />- Nếu hủy chuyến du lịch trong vòng từ 08-11 ngày trước ngày khởi hành: Chi phí hủy tour: 50% trên giá tour du lịch. <br />- Nếu hủy chuyến du lịch trong vòng từ 05-07 ngày trước ngày khởi hành: Chi phí hủy
                                    tour 70% trên giá tour du lịch. <br />- Nếu hủy chuyến du lịch trong vòng từ 02-04 ngày trước ngày khởi hành: Chi phí hủy tour 90% trên giá vé du lịch. <br />- Nếu hủy chuyến du lịch trong vòng 1 ngày trước ngày
                                    khởi hành : Chi phí hủy tour 100% trên giá vé du lịch. <br />
                                </div>
                            </p-accordion-content>
                        </p-accordion-panel>
                        <p-accordion-panel value="2">
                            <p-accordion-header>Các điều kiện hủy tour đối với ngày lễ, Tết</p-accordion-header>
                            <p-accordion-content>
                                <div>
                                    - Được chuyển sang các tuyến du lịch khác trước ngày khởi hành 30 ngày : Không mất chi phí. <br />- Nếu hủy hoặc chuyển sang các chuyến du lịch khác ngay sau khi đăng ký đến 29 ngày trước ngày khởi hành, chi phí
                                    hủy tour: 50% tiền cọc tour. <br />- Nếu hủy hoặc chuyển sang các chuyến du lịch khác từ 20-24 ngày trước ngày khởi hành, chi phí hủy tour: 100% tiền cọc tour. <br />- Nếu hủy chuyến du lịch trong vòng từ 17-19
                                    ngày trước ngày khởi hành, chi phí hủy tour: 50% trên giá tour du lịch. <br />- Nếu hủy chuyến du lịch trong vòng từ 08-16 ngày trước ngày khởi hành, chi phí hủy tour: 70% trên giá tour du lịch. <br />- Nếu hủy
                                    chuyến du lịch trong vòng từ 02-07 ngày trước ngày khởi hành, chi phí hủy tour: 90% trên giá vé du lịch. <br />- Nếu hủy chuyến du lịch trong vòng 1 ngày trước ngày khởi hành, chi phí hủy tour: 100% trên giá vé du
                                    lịch. <br /> Thời gian hủy chuyến du lịch được tính cho ngày làm việc, không tính thứ 7, Chủ Nhật và các ngày Lễ, Tết. <br />
                                </div>
                            </p-accordion-content>
                        </p-accordion-panel>
                        <p-accordion-panel value="3">
                            <p-accordion-header>Trường hợp bất khả kháng</p-accordion-header>
                            <p-accordion-content>
                                <div>
                                    - Nếu chương trình du lịch bị hủy bỏ hoặc thay đổi bởi một trong hai bên vì lý do bất khả kháng (hỏa hoạn, thời tiết, tai nạn, thiên tai, chiến tranh, dịch bệnh, hoãn, dời, và hủy chuyến hoặc thay đổi khác của các
                                    phương tiện vận chuyển công cộng hoặc các sự việc bất khả kháng khác theo quy định pháp luật…), thì hai bên sẽ không chịu bất kỳ nghĩa vụ bồi hoàn các tổn thất đã xảy ra và không chịu bất kỳ trách nhiệm pháp lý
                                    nào. Tuy nhiên mỗi bên có trách nhiệm cố gắng tối đa để giúp đỡ bên bị thiệt hại nhằm giảm thiểu các tổn thất gây ra vì lý do bất khả kháng. <br />
                                </div>
                            </p-accordion-content>
                        </p-accordion-panel>
                        <p-accordion-panel value="4">
                            <p-accordion-header>Liên hệ</p-accordion-header>
                            <p-accordion-content>
                                <div>
                                    <title></title>

                                    <p class="text-center">
                                        <strong
                                            >Mọi chi tiết vui lòng liên hệ:<br />
                                            KHỐI KHÁCH LẺ - DU LỊCH TRONG NƯỚC<br />
                                            190 PASTEUR, PHƯỜNG VÕ THỊ SÁU, QUẬN 3, TP.HCM<br />
                                            Điện thoại: (84-28) 3822 8898<br />
                                            Hotline: 0938 301 399<br />
                                            Tổng đài tư vấn từ 8h - 18h: &nbsp;1900 1839<br />
                                            <br />
                                            VIETRAVEL KÍNH CHÚC QUÝ KHÁCH MỘT CHUYẾN DU LỊCH VUI VẺ</strong
                                        ><br />
                                        &nbsp;
                                    </p>
                                </div>
                            </p-accordion-content>
                        </p-accordion-panel>
                    </p-accordion>
                </div>
            </div>
        </div>
    `
})
export class TourNoteComponent {}
