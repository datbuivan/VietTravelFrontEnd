import { Room } from '@shared/models/room';
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
import { DialogModule } from 'primeng/dialog';
import { HotelRegulationComponent } from '@travel/component/hotel/hotel-regulation/hotel-regulation.component';
import { HotelAmenitiesComponent } from '@travel/component/hotel/hotel-amenities/hotel-amenities.component';

@Component({
    selector: 'app-hotel-details',
    imports: [BreadcrumbModule, RouterModule, CommonModule, CarouselModule, ButtonModule, AccordionModule, CarouselModule, RoomItemComponent, RoomItemComponent, ScrollPanelModule, DialogModule, HotelRegulationComponent, HotelAmenitiesComponent],
    templateUrl: './hotel-details.component.html',
    styleUrl: './hotel-details.component.scss',
    standalone: true
})
export class HotelDetailsComponent implements OnInit {
    displayDialog: boolean = false;
    isExpanded = false;
    numbers: number[] = Array.from({ length: 5 }, (_, i) => i + 1);
    items = [{ icon: 'pi pi-home', route: '/' }, { label: 'Hotel', route: '/hotel' }, { label: 'Hà Nội' }];
    selectHotel: any | null = null;
    images = [
        { itemImageSrc: 'https://res.cloudinary.com/docff5snu/image/upload/v1746984611/cities/3/hanoi.jpg', thumbnailImageSrc: 'https://res.cloudinary.com/docff5snu/image/upload/v1746984611/cities/3/hanoi.jpg' },
        { itemImageSrc: 'https://res.cloudinary.com/docff5snu/image/upload/v1747029366/cities/19/hoian.jpg', thumbnailImageSrc: 'https://res.cloudinary.com/docff5snu/image/upload/v1747029366/cities/19/hoian.jpg' },
        { itemImageSrc: 'https://res.cloudinary.com/docff5snu/image/upload/v1747030507/cities/4/hatinh.jpg', thumbnailImageSrc: 'https://res.cloudinary.com/docff5snu/image/upload/v1747030507/cities/4/hatinh.jpg' },
        { itemImageSrc: 'https://res.cloudinary.com/docff5snu/image/upload/v1747030985/cities/5/haiphong.jpg', thumbnailImageSrc: 'https://res.cloudinary.com/docff5snu/image/upload/v1747030985/cities/5/haiphong.jpg' },
        { itemImageSrc: 'https://res.cloudinary.com/docff5snu/image/upload/v1747031044/cities/6/phuquoc.jpg', thumbnailImageSrc: 'https://res.cloudinary.com/docff5snu/image/upload/v1747031044/cities/6/phuquoc.jpg' },
        { itemImageSrc: 'https://res.cloudinary.com/docff5snu/image/upload/v1747031095/cities/7/hanam.jpg', thumbnailImageSrc: 'https://res.cloudinary.com/docff5snu/image/upload/v1747031095/cities/7/hanam.jpg' }
    ];
    rooms: Room[] = [];
    constructor(
        private route: ActivatedRoute,
        private roomService: RoomService
    ) {}
    ngOnInit(): void {}

    showDialog() {
        this.displayDialog = true;
    }

    hideDialog() {
        this.displayDialog = false;
    }
}
