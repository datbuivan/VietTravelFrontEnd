import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { Select } from 'primeng/select';
import { HotelSearchComponent } from '@travel/component/hotel/hotel-search/hotel-search.component';
import { HotelItemComponent } from '@travel/component/hotel/hotel-item/hotel-item.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { HotelService } from '@services/common/hotel.service';
import { Hotel } from '@shared/models/hotel';
import { HotelSpecParams } from '@app/shared/models/hotel-params';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-hotel',
    imports: [ButtonModule, RouterModule, BreadcrumbModule, Select, FormsModule, ReactiveFormsModule, DatePickerModule, CommonModule, HotelSearchComponent, HotelItemComponent, ToastModule],
    templateUrl: './hotel.component.html',
    styleUrl: './hotel.component.scss',
    standalone: true,
    providers: [MessageService]
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
    hotelParams: HotelSpecParams = {
        sort: 'name'
    };
    constructor(
        private hotelService: HotelService,
        private route: ActivatedRoute,
        private messageService: MessageService
    ) {}
    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.hotelParams = {
                ...this.hotelParams,
                cityId: params['cityId'] ? +params['cityId'] : undefined,
                startDate: params['startDate'] ? new Date(params['startDate']) : undefined,
                minPrice: params['minPrice'] ? +params['minPrice'] : undefined,
                maxPrice: params['maxPrice'] ? +params['maxPrice'] : undefined
            };
            this.fetchHotels();
        });
        this.selectedOption = this.sortOptions.find((opt) => opt.value === this.hotelParams.sort) || this.sortOptions[0];
        // this.fetchHotels();
    }

    fetchHotels() {
        this.hotelService.getHotelsWithSpec(this.hotelParams).subscribe({
            next: (hotels) => {
                this.hotels = hotels;
                this.loading = false;
            },
            error: (error) => {
                this.loading = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Lỗi',
                    detail: error.message
                });
            }
        });
        // this.hotelService.getHotels().subscribe({
        //     next: (response) => {
        //         this.hotels = response;
        //         console.log(this.hotels);
        //         this.loading = false;
        //     },
        //     error: (error) => {
        //         this.loading = false;
        //         this.error = error.message;
        //         console.log(error);
        //     }
        // });
    }

    onFilterChange(filter: HotelSpecParams) {
        this.hotelParams = {
            ...this.hotelParams,
            cityId: filter.cityId,
            startDate: filter.startDate,
            minPrice: filter.minPrice,
            maxPrice: filter.maxPrice
        };

        this.fetchHotels();
    }

    onSortChange() {
        if (this.selectedOption) {
            this.hotelParams.sort = this.selectedOption.value;
            this.fetchHotels();
        }
    }
}
