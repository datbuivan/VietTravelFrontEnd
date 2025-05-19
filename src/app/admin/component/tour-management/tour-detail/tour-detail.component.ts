import { TourService } from './../../../../services/common/tour.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Tour } from '../../../../shared/models/tour';
import { CommonModule } from '@angular/common';
import { VndCurrencyPipe } from '../../../../shared/pipes/vnd.pipe';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-tour-detail',
    standalone: true,
    imports: [CommonModule, ButtonModule, VndCurrencyPipe, TableModule, RouterModule],
    templateUrl: './tour-detail.component.html',
    styleUrl: './tour-detail.component.scss'
})
export class TourDetailComponent implements OnInit {
    tour!: Tour;

    tourId: number = 0;

    constructor(
        private route: ActivatedRoute,
        private tourService: TourService
    ) {}
    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.tourId = id ? +id : 0;
        // Giả lập dữ liệu tour - Thay bằng gọi API thực tế
        this.tour = {
            id: 1,
            name: 'Tour Đà Lạt 3N2D',
            images: ['https://res.cloudinary.com/docff5snu/image/upload/v1745675652/tour_images/phuquoc.jpg', 'https://res.cloudinary.com/docff5snu/image/upload/v1745675652/tour_images/phuquoc.jpg'],
            price: 5000000,
            childPrice: 3000000,
            singleRoomSurcharge: 1000000,
            cityId: 1,
            tourStartDates: [
                { id: 1, startDate: new Date('2025-06-01'), availableSlots: 10 },
                { id: 2, startDate: new Date('2025-06-15'), availableSlots: 5 }
            ],
            tourSchedules: [
                { id: 1, title: ' Title 1', dayNumber: 1, description: 'Tham quan Thác Datanla và Làng hoa Vạn Thành.' },
                { id: 2, title: ' Title 2', dayNumber: 2, description: 'Khám phá Đồi chè Cầu Đất và Thiền viện Trúc Lâm.' },
                { id: 3, title: ' Title 3', dayNumber: 1, description: 'Tham quan Thác Datanla và Làng hoa Vạn Thành.' }
            ]
        };
        // this.getTour(1);
        // console.log('Tour la ' + this.tour);
    }

    getTour(id: number) {
        this.tourService.getTour(id).subscribe({
            next: (res) => {
                this.tour = res;
            },
            error: (err) => {
                console.error(err);
            }
        });
    }
}
