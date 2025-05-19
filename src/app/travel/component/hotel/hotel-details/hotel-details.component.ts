import { Room } from '@shared/models/room';
import { GalleriaModule } from 'primeng/galleria';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { CarouselModule } from 'primeng/carousel';
import { RoomItemComponent } from '@travel/component/hotel/room-item/room-item.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { RoomService } from '@services/common/room.service';

@Component({
    selector: 'app-hotel-details',
    imports: [BreadcrumbModule, RouterModule, CommonModule, GalleriaModule, ButtonModule, AccordionModule, CarouselModule, RoomItemComponent, RoomItemComponent, ScrollPanelModule],
    templateUrl: './hotel-details.component.html',
    styleUrl: './hotel-details.component.scss',
    standalone: true
})
export class HotelDetailsComponent implements OnInit {
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
    rooms: Room[] = [];
    constructor(
        private route: ActivatedRoute,
        private roomService: RoomService
    ) {}
    ngOnInit(): void {}
    // getRooms() {
    //     const hotelId = this.route.snapshot.paramMap.get('id');
    //     const hotelIdNumber = hotelId ? Number(hotelId) : null;
    //     if (hotelIdNumber) {
    //         this.roomService.getRoomByHotelId(hotelIdNumber).subscribe({
    //             next: (response) => (this.rooms = response)
    //         });
    //     }
    // }
}
