import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { PanelModule } from 'primeng/panel';
import { SelectModule } from 'primeng/select';
import { TabsModule } from 'primeng/tabs';
interface City {
    name: string;
    code: string;
}

interface RangerPrice {
    name: string;
    priceFrom: number;
    priceTo: number;
}
@Component({
    selector: 'app-search',
    imports: [InputNumberModule, CommonModule, SelectModule, TabsModule, FormsModule, PanelModule, ButtonModule, DatePickerModule, ReactiveFormsModule],
    templateUrl: './search.component.html',
    styleUrl: './search.component.scss',
    standalone: true
})
export class SearchComponent implements OnInit {
    cities: City[] | undefined;

    prices: RangerPrice[] | undefined;

    dropdownVisible = false;

    tourForm!: FormGroup;

    hotelForm!: FormGroup;
    constructor(private fb: FormBuilder) {}
    ngOnInit() {
        this.tourForm = this.fb.group({
            tourCity: new FormControl('', [Validators.required]),
            date: new FormControl(new Date(), [Validators.required]),
            price: new FormControl(['', ''], [Validators.required])
        });
        this.hotelForm = this.fb.group({
            city: new FormControl('', [Validators.required]),
            date: new FormControl(this.getDefaultDateRange(), [Validators.required]),
            price: new FormControl('', [Validators.required]),
            people: new FormControl(2, Validators.required)
        });
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];

        this.prices = [
            { name: 'Dưới 5 triệu', priceFrom: 0, priceTo: 5000000 },
            { name: 'Từ 5 - 10 triệu', priceFrom: 5000000, priceTo: 10000000 },
            { name: 'Từ 10 - 20 triệu', priceFrom: 10000000, priceTo: 20000000 }
        ];
    }
    onSubmitTour() {
        const price = this.tourForm.get('price')?.value;
        console.log(price.priceTo);
    }
    onSubmitHotel() {
        console.log(this.hotelForm.value);
    }
    getDefaultDateRange() {
        const today = new Date();
        const startDate = new Date(today);
        const endDate = new Date(today);

        endDate.setDate(endDate.getDate() + 1); // Ngày mai

        return [startDate, endDate]; // Trả về mảng ngày
    }
    toggleDropdown() {
        this.dropdownVisible = !this.dropdownVisible;
    }

    getSummary() {
        const people = this.hotelForm.get('people')?.value;
        return `${people} người lớn`;
    }
}
