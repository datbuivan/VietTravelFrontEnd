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
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Tour } from '../../../shared/models/tour';
import { InputNumberModule } from 'primeng/inputnumber';
import { TourService } from '../../../services/common/tour.service';
import { Image } from 'primeng/image';
import { VndCurrencyPipe } from '../../../shared/pipes/vnd.pipe';
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
            tourStartDates: this.fb.array([this.createTourStartDateForm()], Validators.required),
            tourSchedules: this.fb.array([this.createTourScheduleForm()], Validators.required),
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
        formData.append('upload_preset', 'your_upload_preset'); // nếu dùng Cloudinary
        // formData.append('api_key', 'your_api_key'); // tùy cloud nào yêu cầu
    }

    submitForm() {
        this.submitted = true;

        // if (this.tourForm.invalid) {
        //     return;
        // }

        const formValue = this.tourForm.value;

        const formData = new FormData();

        formData.append('name', formValue.name);
        formData.append('price', formValue.price);
        formData.append('youngPrice', formValue.youngPrice);
        formData.append('childPrice', formValue.childPrice);
        if (formValue.singleRoomSurcharge !== null) {
            formData.append('singleRoomSurcharge', formValue.singleRoomSurcharge);
        }
        formData.append('cityId', formValue.cityId);

        formData.append('tourStartDates', JSON.stringify(formValue.tourStartDates));

        formData.append('tourSchedules', JSON.stringify(formValue.tourSchedules));

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

    createTourStartDateForm(): FormGroup {
        return this.fb.group({
            startDate: [null, Validators.required],
            availableSlots: [null, Validators.required]
        });
    }

    createTourScheduleForm(): FormGroup {
        return this.fb.group({
            title: ['', Validators.required],
            dayNumber: [null, Validators.required]
        });
    }

    addTourStartDate(): void {
        this.tourStartDateControls.push(this.createTourStartDateForm());
    }

    removeTourStartDate(index: number): void {
        this.tourStartDateControls.removeAt(index);
    }

    addTourSchedule(): void {
        this.tourScheduleControls.push(this.createTourScheduleForm());
    }

    removeTourSchedule(index: number): void {
        this.tourScheduleControls.removeAt(index);
    }

    get tourStartDateControls(): FormArray {
        return this.tourForm.get('tourStartDates') as FormArray;
    }

    setTourStartDates(startDateForms: FormGroup[]): void {
        this.tourForm.setControl('tourStartDates', this.fb.array(startDateForms));
    }

    get tourScheduleControls(): FormArray {
        return this.tourForm.get('tourSchedules') as FormArray;
    }

    setTourSchedules(tourScheduleForms: FormGroup[]): void {
        this.tourForm.setControl('tourSchedules', this.fb.array(tourScheduleForms));
    }
}
