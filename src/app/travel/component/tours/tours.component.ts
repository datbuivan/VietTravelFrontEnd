import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { Select } from 'primeng/select';
import { TourSearchComponent } from '@travel/component/tours/tour-search/tour-search.component';
import { TourItemComponent } from '@travel/component/tours/tour-item/tour-item.component';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { RouterModule } from '@angular/router';
import { TourService } from '@services/common/tour.service';
import { Tour } from '@shared/models/tour';
@Component({
    selector: 'app-tours',
    imports: [ButtonModule, RouterModule, Select, FormsModule, BreadcrumbModule, ReactiveFormsModule, DatePickerModule, TourSearchComponent, TourItemComponent, CommonModule],
    templateUrl: './tours.component.html',
    styleUrl: './tours.component.scss',
    standalone: true
})
export class ToursComponent implements OnInit {
    selectedOption: any | undefined;
    tours: Tour[] = [];
    loading = true;
    error: string | null = null;
    items = [
        { icon: 'pi pi-home', route: '/' },
        { label: 'Tour', route: '/tour' }
    ];
    sortOptions = [
        { name: 'Tất cả', value: 'all' },
        { name: 'Giá: thấp đến cao', value: 'priceAsc' },
        { name: 'Giá: cao đến thấp', value: 'priceDesc' }
    ];

    constructor(private tourService: TourService) {}
    ngOnInit(): void {
        this.fetchTours();
    }

    fetchTours() {
        this.tourService.getTours().subscribe({
            next: (response) => {
                this.tours = response;
                console.log('Tours:', this.tours);
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
