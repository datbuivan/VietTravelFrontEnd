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
import { HotelService } from '@app/services/common/hotel.service';
import { Hotel } from '@app/shared/models/hotel';
import { VndCurrencyPipe } from '@app/shared/pipes/vnd.pipe';

@Component({
    selector: 'app-hotel-details',
    imports: [
        BreadcrumbModule,
        RouterModule,
        CommonModule,
        CarouselModule,
        ButtonModule,
        AccordionModule,
        CarouselModule,
        RoomItemComponent,
        RoomItemComponent,
        ScrollPanelModule,
        DialogModule,
        HotelRegulationComponent,
        HotelAmenitiesComponent,
        VndCurrencyPipe
    ],
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
    rooms: Room[] = [];
    hotelId: number | null = null;
    hotel!: Hotel;
    constructor(
        private route: ActivatedRoute,
        private hotelService: HotelService,
        private roomService: RoomService
    ) {}
    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.hotelId = id ? +id : 0;
        this.fetchHotel(this.hotelId);
    }

    fetchHotel(id: number) {
        this.hotelService.getHotel(id).subscribe({
            next: (res) => {
                this.hotel = res;
                console.log(res);
            },
            error: (err) => {
                console.error(err);
            }
        });
    }

    showDialog() {
        this.displayDialog = true;
    }

    hideDialog() {
        this.displayDialog = false;
    }
}
