import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { Select } from 'primeng/select';
import { HotelSearchComponent } from './hotel-search/hotel-search.component';
import { HotelItemComponent } from './hotel-item/hotel-item.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { HotelService } from '../../services/hotel.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-hotel',
    imports: [ButtonModule, RouterModule, BreadcrumbModule, Select, FormsModule, ReactiveFormsModule, DatePickerModule, CommonModule, HotelSearchComponent, HotelItemComponent],
    templateUrl: './hotel.component.html',
    styleUrl: './hotel.component.scss',
    standalone: true
})
export class HotelComponent implements OnInit {
    hotels: any[] = [];
    hotel: any;
    selectedOption: any | undefined;
    items = [{ icon: 'pi pi-home', route: '/' }, { label: 'Hotel', route: '/hotel' }, { label: 'Hà Nội' }];
    sortOptions = [
        { name: 'Tất cả', value: 'all' },
        { name: 'Giá: thấp đến cao', value: 'priceAsc' },
        { name: 'Giá: cao đến thấp', value: 'priceDesc' }
    ];
    constructor(private hotelService: HotelService) {}
    ngOnInit(): void {
        this.getHotels();
    }
    getHotels() {
        this.hotels = this.hotelService.getHotels();
        console.log(this.hotel);
    }
    getHotel(id: number) {
        this.hotel = this.getHotel(id);
    }
}
