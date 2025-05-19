import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { City } from '../../../../shared/models/city';
import { CityService } from '../../../../services/common/city.service';

@Component({
    selector: 'app-add-tour',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, InputTextModule, InputNumberModule, SelectModule, FileUploadModule, ButtonModule, RouterModule],
    templateUrl: './add-tour.component.html',
    styleUrl: './add-tour.component.scss'
})
export class AddTourComponent implements OnInit {
    tourForm: FormGroup;
    cities: City[] = [];

    constructor(
        private fb: FormBuilder,
        private cityService: CityService
    ) {
        this.tourForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            price: [0, [Validators.required, Validators.min(0)]],
            childPrice: [0, [Validators.required, Validators.min(0)]],
            singleRoomSurcharge: [0, [Validators.required, Validators.min(0)]],
            cityId: [null, Validators.required],
            image: [null, Validators.required],
            pictures: [[]]
        });
    }

    ngOnInit(): void {
        this.getCities();
    }

    onPicturesSelect(event: any): void {
        const files: File[] = event.files ? Array.from(event.files) : [];
        this.tourForm.patchValue({ pictures: files });
        this.tourForm.get('pictures')?.markAsTouched();
    }

    submitTour(): void {
        if (this.tourForm.valid) {
            console.log('Tour data:', this.tourForm.value);
            // Thêm logic để gửi dữ liệu đến server
        }
    }

    getCities(): void {
        this.cityService.getCities().subscribe({
            next: (response) => {
                this.cities = response;
            },
            error: (error) => console.error(error)
        });
    }
}
