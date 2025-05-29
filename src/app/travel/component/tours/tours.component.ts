import { UserDto } from '@app/shared/models/user-dto';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { Select } from 'primeng/select';
import { TourSearchComponent } from '@travel/component/tours/tour-search/tour-search.component';
import { TourItemComponent } from '@travel/component/tours/tour-item/tour-item.component';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TourService } from '@services/common/tour.service';
import { Tour } from '@shared/models/tour';
import { TourSpecParams } from '@app/shared/models/tour-params';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '@app/services/common/auth.service';
@Component({
    selector: 'app-tours',
    imports: [ButtonModule, RouterModule, Select, FormsModule, BreadcrumbModule, ReactiveFormsModule, DatePickerModule, TourSearchComponent, TourItemComponent, CommonModule, ToastModule],
    templateUrl: './tours.component.html',
    styleUrl: './tours.component.scss',
    standalone: true,
    providers: [MessageService]
})
export class ToursComponent implements OnInit {
    currentUser$: UserDto | null = null;
    selectedOption: { name: string; value: string } | null = null;
    tours: Tour[] = [];
    loading = true;
    error: string | null = null;
    tourFilterForm: FormGroup;
    items = [
        { icon: 'pi pi-home', route: '/' },
        { label: 'Tour', route: '/tour' }
    ];
    sortOptions = [
        { name: 'Tên (A-Z)', value: 'name' },
        { name: 'Giá (Thấp-Cao)', value: 'priceAsc' },
        { name: 'Giá (Cao-Thấp)', value: 'priceDesc' },
        { name: 'Ngày (Sớm-Muộn)', value: 'dateAsc' },
        { name: 'Ngày (Muộn-Sớm)', value: 'dateDesc' }
    ];

    tourParams: TourSpecParams = {
        sort: 'name'
    };

    constructor(
        private fb: FormBuilder,
        private tourService: TourService,
        private route: ActivatedRoute,
        private messageService: MessageService
    ) {
        this.tourFilterForm = this.fb.group({
            cityId: [null],
            startDate: [null],
            minPrice: [null],
            maxPrice: [null],
            endDate: [null]
        });
    }
    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.tourParams = {
                ...this.tourParams,
                cityId: params['cityId'] ? +params['cityId'] : undefined,
                startDate: params['startDate'] ? new Date(params['startDate']) : undefined,
                minPrice: params['minPrice'] ? +params['minPrice'] : undefined,
                maxPrice: params['maxPrice'] ? +params['maxPrice'] : undefined
            };
            this.loadTours();
        });
        this.selectedOption = this.sortOptions.find((opt) => opt.value === this.tourParams.sort) || this.sortOptions[0];
    }

    loadTours(): void {
        this.tourService.getToursWithSpec(this.tourParams).subscribe({
            next: (tours) => {
                this.tours = tours;
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
    }

    onFilterChange(filter: TourSpecParams) {
        this.tourParams = {
            ...this.tourParams,
            cityId: filter.cityId,
            startDate: filter.startDate,
            minPrice: filter.minPrice,
            maxPrice: filter.maxPrice
        };

        this.loadTours();
    }

    onSortChange() {
        if (this.selectedOption) {
            this.tourParams.sort = this.selectedOption.value;
            this.loadTours();
        }
    }
}
