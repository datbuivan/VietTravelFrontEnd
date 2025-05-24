import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HotelService } from '@app/services/common/hotel.service';
import { Hotel } from '@app/shared/models/hotel';
import { VndCurrencyPipe } from '@app/shared/pipes/vnd.pipe';
import { ButtonModule } from 'primeng/button';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'app-hotel-item',
    imports: [ButtonModule, RouterModule, CommonModule, VndCurrencyPipe],
    templateUrl: './hotel-item.component.html',
    styleUrl: './hotel-item.component.scss',
    standalone: true
})
export class HotelItemComponent {
    @Input() hotel: Hotel | null = null;
    hotel$: Observable<Hotel | null> = of(null);
    error: string | null = null;
    loading = false;

    constructor(
        private hotelService: HotelService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        if (!this.hotel) {
            const tourIdStr = this.route.snapshot.paramMap.get('id');
            const tourId = tourIdStr ? parseInt(tourIdStr, 10) : 0;
            this.fetchHotel(tourId);
        } else {
            this.hotel$ = of(this.hotel);
        }
    }

    private fetchHotel(id: number) {
        this.loading = true;
        this.hotelService.getHotel(id).subscribe({
            next: (res) => {
                this.hotel = res;
            },
            error: (err) => {
                console.error(err);
            }
        });
    }
}
