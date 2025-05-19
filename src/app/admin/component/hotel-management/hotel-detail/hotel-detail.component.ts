import { Hotel } from '@app/shared/models/hotel';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { HotelService } from '@app/services/common/hotel.service';

@Component({
    selector: 'app-hotel-detail',
    standalone: true,
    imports: [CommonModule, ButtonModule, RouterModule],
    templateUrl: './hotel-detail.component.html',
    styleUrl: './hotel-detail.component.scss'
})
export class HotelDetailComponent implements OnInit {
    hotel: Hotel | null = null;

    HotelId?: number;

    constructor(
        private route: ActivatedRoute,
        private hotelService: HotelService
    ) {}

    ngOnInit(): void {
        const Id = this.route.snapshot.paramMap.get('id');
        this.HotelId = Id ? parseInt(Id) : 0;
        if (this.HotelId) {
            this.getHotel(this.HotelId);
        }
    }

    getHotel(id: number) {
        this.hotelService.getHotel(id).subscribe({
            next: (res) => {
                this.hotel = res;
            },
            error: (error) => {
                console.error('Error fetching hotel:', error);
            }
        });
    }
}
