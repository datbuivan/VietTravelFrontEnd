import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { Select } from 'primeng/select';
import { TourSearchComponent } from './tour-search/tour-search.component';
import { TourItemComponent } from './tour-item/tour-item.component';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { RouterModule } from '@angular/router';
import { TourService } from '../../services/tour.service';
@Component({
    selector: 'app-tours',
    imports: [ButtonModule, RouterModule, Select, FormsModule, BreadcrumbModule, ReactiveFormsModule, DatePickerModule, TourSearchComponent, TourItemComponent, CommonModule],
    templateUrl: './tours.component.html',
    styleUrl: './tours.component.scss',
    standalone: true
})
export class ToursComponent implements OnInit {
    selectedOption: any | undefined;
    tours: any[] = [];
    tour: any;
    items = [
        { icon: 'pi pi-home', route: '/' },
        { label: 'Tour', route: '/tour' }
    ];
    sortOptions = [
        { name: 'Tất cả', value: 'all' },
        { name: 'Giá: thấp đến cao', value: 'priceAsc' },
        { name: 'Giá: cao đến thấp', value: 'priceDesc' }
    ];

    constructor(
        private fb: FormBuilder,
        private tourService: TourService
    ) {}
    ngOnInit(): void {
        this.getTours();
    }
    getTours() {
        this.tours = this.tourService.getTours();
    }
    getTour(id: number) {
        this.tour = this.tourService.getTour(id);
    }
}
