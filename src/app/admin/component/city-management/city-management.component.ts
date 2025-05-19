import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { IconFieldModule } from 'primeng/iconfield';
import { Image } from 'primeng/image';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { City } from '@app/shared/models/city';
import { CityService } from '@app/services/common/city.service';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-city-management',
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
    templateUrl: './city-management.component.html',
    styleUrl: './city-management.component.scss'
})
export class CityManagementComponent implements OnInit {
    cities: City[] = [];
    city!: City;

    constructor(
        private fb: FormBuilder,
        private cityService: CityService
    ) {}

    ngOnInit(): void {
        this.getCities();
    }

    getCities() {
        this.cityService.getCities().subscribe({
            next: (response) => {
                this.cities = response;
            },
            error: (error) => console.error(error)
        });
    }
    deleteCity(id: number) {}
}
