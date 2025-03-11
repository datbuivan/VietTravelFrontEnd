import { GalleriaModule } from 'primeng/galleria';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { CarouselModule } from 'primeng/carousel';
import { RoomItemComponent } from '../room-item/room-item.component';

@Component({
    selector: 'app-hotel-details',
    imports: [BreadcrumbModule, RouterModule, CommonModule, GalleriaModule, ButtonModule, AccordionModule, CarouselModule, RoomItemComponent, RoomItemComponent],
    templateUrl: './hotel-details.component.html',
    styleUrl: './hotel-details.component.scss',
    standalone: true
})
export class HotelDetailsComponent {
    isExpanded = false;
    numbers: number[] = Array.from({ length: 5 }, (_, i) => i + 1);
    services: string[] = ['Spa/xông khô', 'Dịch vụ vé', 'Chuyến du lịch', 'Dịch vụ thanh toán không sử dụng tiền mặt', 'Dịch vụ taxi', 'Thuê xe đạp', 'Điều hòa', 'Áo choàng tắm'];
    items = [{ icon: 'pi pi-home', route: '/' }, { label: 'Hotel', route: '/hotel' }, { label: 'Hà Nội' }];
    selectHotel: any | null = null;
    images = [
        {
            itemImageSrc: 'images/uploadImage/phuquochotel.jpg',
            thumbnailImageSrc: 'images/uploadImage/phuquochotel.jpg',
            alt: 'Phú Quốc Hotel',
            title: 'Phú Quốc Hotel'
        },
        {
            itemImageSrc: 'images/uploadImage/phuquochotel2.jpg',
            thumbnailImageSrc: 'images/uploadImage/phuquochotel.jpg',
            alt: 'Phú Quốc Hotel ',
            title: 'Phú Quốc Hotel'
        },
        {
            itemImageSrc: 'images/uploadImage/phuquochotel3.jpg',
            thumbnailImageSrc: 'images/uploadImage/phuquochotel3.jpg',
            alt: 'Phú Quốc Hotel',
            title: 'Phú Quốc Hotel'
        },
        {
            itemImageSrc: 'images/uploadImage/phuquochotel1.jpg',
            thumbnailImageSrc: 'images/uploadImage/phuquochotel1.jpg',
            alt: 'Phú Quốc Hotel',
            title: 'Phú Quốc Hotel'
        }
    ];
    rooms = [
        {
            name: 'Phòng Tiêu chuẩn hướng thành phố',
            price: 7265538,
            amenities: ['Bữa sáng', 'Bãi đỗ xe', 'Nước uống chào đón', 'Cà phê & trà', 'Wifi miễn phí'],
            selected: false
        },
        {
            name: 'Phòng Tiêu chuẩn hướng thành phố',
            price: 7265538,
            amenities: ['Bữa sáng', 'Bãi đỗ xe', 'Nước uống chào đón', 'Cà phê & trà', 'Wifi miễn phí'],
            selected: false
        }
    ];
}
