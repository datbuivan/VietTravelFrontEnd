import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CityService } from '@app/services/common/city.service';
import { City } from '@app/shared/models/city';
import { HotelSpecParams } from '@app/shared/models/hotel-params';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { Rating } from 'primeng/rating';
import { SelectModule } from 'primeng/select';
import { Slider } from 'primeng/slider';

@Component({
    selector: 'app-hotel-search',
    imports: [CommonModule, ButtonModule, DatePickerModule, SelectModule, ReactiveFormsModule, FormsModule],
    templateUrl: './hotel-search.component.html',
    styleUrl: './hotel-search.component.scss',
    standalone: true
})
export class HotelSearchComponent implements OnInit {
    @Output() filterChange = new EventEmitter<HotelSpecParams>(); // Phát sự kiện khi bộ lọc thay đổi
    cities: City[] = [];
    prices = [
        { name: 'Dưới 5 triệu', minPrice: 0, maxPrice: 5000000 },
        { name: 'Từ 5 - 10 triệu', minPrice: 5000000, maxPrice: 10000000 },
        { name: 'Từ 10 - 20 triệu', minPrice: 10000000, maxPrice: 20000000 },
        { name: 'Trên 20 triệu', minPrice: 20000000, maxPrice: null }
    ];

    hotelFilterForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private cityService: CityService
    ) {
        this.hotelFilterForm = this.fb.group({
            cityId: [null],
            startDate: [null],
            minPrice: [null],
            maxPrice: [null]
        });
    }
    ngOnInit() {
        this.fetchCities();
    }

    fetchCities() {
        this.cityService.getCities().subscribe({
            next: (response) => {
                this.cities = response;
            },
            error: (error) => console.error(error)
        });
    }

    onSubmit() {
        const filter = this.hotelFilterForm.value;
        this.filterChange.emit(filter);
    }

    onPriceChange(price: { name: string; minPrice: number; maxPrice: number | null }) {
        if (price) {
            this.hotelFilterForm.patchValue({
                minPrice: price.minPrice,
                maxPrice: price.maxPrice
            });
        }
        this.onSubmit();
    }
}
