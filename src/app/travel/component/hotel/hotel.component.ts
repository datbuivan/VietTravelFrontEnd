import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { Select } from 'primeng/select';
import { HotelSearchComponent } from '@travel/component/hotel/hotel-search/hotel-search.component';
import { HotelItemComponent } from '@travel/component/hotel/hotel-item/hotel-item.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { HotelService } from '@services/common/hotel.service';
import { Hotel } from '@shared/models/hotel';

@Component({
    selector: 'app-hotel',
    imports: [ButtonModule, RouterModule, BreadcrumbModule, Select, FormsModule, ReactiveFormsModule, DatePickerModule, CommonModule, HotelSearchComponent, HotelItemComponent],
    templateUrl: './hotel.component.html',
    styleUrl: './hotel.component.scss',
    standalone: true
})
export class HotelComponent implements OnInit {
    hotels: Hotel[] = [];
    loading = true;
    error: string | null = null;
    selectedOption: any | undefined;
    items = [{ icon: 'pi pi-home', route: '/' }, { label: 'Hotel', route: '/hotel' }, { label: 'Hà Nội' }];
    sortOptions = [
        { name: 'Tất cả', value: 'all' },
        { name: 'Giá: thấp đến cao', value: 'priceAsc' },
        { name: 'Giá: cao đến thấp', value: 'priceDesc' }
    ];
    constructor(private hotelService: HotelService) {}
    ngOnInit(): void {
        this.fetchHotels();
    }

    fetchHotels() {
        this.hotelService.getHotels().subscribe({
            next: (response) => {
                this.hotels = response;
                console.log(this.hotels);
                this.loading = false;
            },
            error: (error) => {
                this.loading = false;
                this.error = error.message;
                console.log(error);
            }
        });
    }
}
