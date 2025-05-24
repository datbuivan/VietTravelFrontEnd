import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { SelectModule } from 'primeng/select';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Tour } from '@shared/models/tour';
import { InputNumberModule } from 'primeng/inputnumber';
import { TourService } from '@services/common/tour.service';
import { Image } from 'primeng/image';
import { VndCurrencyPipe } from '@shared/pipes/vnd.pipe';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-tour-management',
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
        VndCurrencyPipe,
        RouterModule
    ],
    templateUrl: './tour-management.html',
    styleUrl: './tour-management.scss'
})
export class TourManagementComponent implements OnInit {
    submitted: boolean = false;

    tourForm!: FormGroup;

    tours: Tour[] = [];
    tour!: Tour;

    uploadedUrls: string[] = [];

    uploadedFiles: any[] = [];

    today: Date = new Date();
    constructor(
        private fb: FormBuilder,
        private tourService: TourService
    ) {}

    ngOnInit() {
        this.tourForm = this.fb.group({
            name: ['', Validators.required],
            price: [0, Validators.required],
            youngPrice: [0, Validators.required],
            childPrice: [0, Validators.required],
            singleRoomSurcharge: [0],
            cityId: [null, Validators.required],
            images: [null]
        });
        this.getTours();
    }

    getTours() {
        this.tourService.getTours().subscribe({
            next: (response) => {
                this.tours = response;
            },
            error: (error) => console.error(error)
        });
    }

    getTour(id: number) {
        this.tourService.getTour(id).subscribe({
            next: (response) => {
                this.tour = response;
            },
            error: (error) => console.error(error)
        });
    }

    deleteTour(id: number) {}

    onUpload(event: any) {
        const files: File[] = event.files;
        for (const file of files) {
            this.uploadImageToCloud(file);
        }
    }

    uploadImageToCloud(file: File) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'your_upload_preset');
    }

    submitForm() {
        this.submitted = true;

        const formValue = this.tourForm.value;

        const formData = new FormData();

        formData.append('name', formValue.name);
        formData.append('price', formValue.price);
        formData.append('childPrice', formValue.childPrice);
        if (formValue.singleRoomSurcharge !== null) {
            formData.append('singleRoomSurcharge', formValue.singleRoomSurcharge);
        }
        formData.append('cityId', formValue.cityId);

        if (this.uploadedFiles.length > 0) {
            for (let i = 0; i < this.uploadedFiles.length; i++) {
                formData.append('images', this.uploadedFiles[i]);
            }
        }
        console.log('Form Data:', this.tourForm.value);
    }

    resetForm() {
        this.tourForm.reset();
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
