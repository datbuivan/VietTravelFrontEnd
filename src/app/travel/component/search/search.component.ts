import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CityService } from '@app/services/common/city.service';
import { TourService } from '@app/services/common/tour.service';
import { City } from '@app/shared/models/city';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { PanelModule } from 'primeng/panel';
import { SelectModule } from 'primeng/select';
import { TabsModule } from 'primeng/tabs';

@Component({
    selector: 'app-search',
    imports: [InputNumberModule, CommonModule, SelectModule, TabsModule, FormsModule, PanelModule, ButtonModule, DatePickerModule, ReactiveFormsModule],
    templateUrl: './search.component.html',
    styleUrl: './search.component.scss',
    standalone: true
})
export class SearchComponent implements OnInit {
    cities: City[] = [];

    prices = [
        { name: 'Dưới 5 triệu', minPrice: 0, maxPrice: 5000000 },
        { name: 'Từ 5 - 10 triệu', minPrice: 5000000, maxPrice: 10000000 },
        { name: 'Từ 10 - 20 triệu', minPrice: 10000000, maxPrice: 20000000 },
        { name: 'Trên 20 triệu', minPrice: 20000000, maxPrice: null }
    ];

    dropdownVisible = false;

    hotelFilterForm: FormGroup;

    tourFilterForm!: FormGroup;
    constructor(
        private fb: FormBuilder,
        private citytService: CityService,
        private router: Router
    ) {
        this.tourFilterForm = this.fb.group({
            cityId: new FormControl(null),
            startDate: new FormControl(null),
            minPrice: new FormControl(null),
            maxPrice: new FormControl(null)
        });

        this.hotelFilterForm = this.fb.group({
            cityId: new FormControl(null),
            date: new FormControl(null),
            price: new FormControl(null),
            people: new FormControl(null)
        });
    }
    ngOnInit() {
        this.fetchCities();
    }
    onSubmitTour() {
        if (this.tourFilterForm.valid) {
            const tourFilter = this.tourFilterForm.value;
            // Chuyển hướng đến TourListComponent với query parameters
            this.router.navigate(['/tours'], {
                queryParams: {
                    cityId: tourFilter.cityId || null,
                    startDate: tourFilter.startDate ? tourFilter.startDate.toISOString().split('T')[0] : null,
                    minPrice: tourFilter.minPrice || null,
                    maxPrice: tourFilter.maxPrice || null
                }
            });
        } else {
            this.tourFilterForm.markAllAsTouched(); // Hiển thị lỗi nếu form không hợp lệ
        }
    }
    onSubmitHotel() {
        console.log(this.hotelFilterForm.value);
    }
    getDefaultDateRange() {
        const today = new Date();
        const startDate = new Date(today);
        const endDate = new Date(today);

        endDate.setDate(endDate.getDate() + 1); // Ngày mai

        return [startDate, endDate]; // Trả về mảng ngày
    }

    fetchCities() {
        this.citytService.getCities().subscribe({
            next: (response) => {
                this.cities = response;
            },
            error: (error) => console.error(error)
        });
    }
    onPriceChange(price: any) {
        if (price) {
            this.tourFilterForm.patchValue({
                minPrice: price.minPrice,
                maxPrice: price.maxPrice
            });
        } else {
            this.tourFilterForm.patchValue({
                minPrice: null,
                maxPrice: null
            });
        }
    }
    toggleDropdown() {
        this.dropdownVisible = !this.dropdownVisible;
    }

    getSummary() {
        const people = this.hotelFilterForm.get('people')?.value;
        return `${people} người lớn`;
    }
}
