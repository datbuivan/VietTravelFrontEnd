import { Component } from '@angular/core';
import { Hotel } from '@app/shared/models/hotel';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { HotelService } from '@app/services/common/hotel.service';
import { Image } from 'primeng/image';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-hotel-management',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        ButtonModule,
        TagModule,
        InputTextModule,
        InputNumberModule,
        FormsModule,
        SelectModule,
        ProgressBarModule,
        MultiSelectModule,
        IconFieldModule,
        InputIconModule,
        DialogModule,
        DropdownModule,
        FileUploadModule,
        ReactiveFormsModule,
        DatePickerModule,
        Image,
        RouterModule
    ],
    templateUrl: './hotel-management.component.html',
    styleUrl: './hotel-management.component.scss'
})
export class HotelManagementComponent {
    hotels: Hotel[] = [];
    Hotel!: Hotel;

    constructor(
        private fb: FormBuilder,
        private hotelService: HotelService
    ) {}

    ngOnInit(): void {
        this.gethotels();
    }

    gethotels() {
        this.hotelService.getHotels().subscribe({
            next: (response) => {
                this.hotels = response;
            },
            error: (error) => console.error(error)
        });
    }
    deleteHotel(id: number) {}
}
