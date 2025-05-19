import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { TooltipModule } from 'primeng/tooltip';
import { City } from '@app/shared/models/city';
import { CityService } from '@app/services/common/city.service';

function phoneNumberValidator(control: any) {
    const phonePattern = /^0[0-9]{9,10}$/;
    if (control.value && !phonePattern.test(control.value)) {
        return { invalidPhone: true };
    }
    return null;
}

@Component({
    selector: 'app-add-hotel',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, InputTextModule, TextareaModule, SelectModule, FileUploadModule, ButtonModule, TooltipModule, RouterModule],
    templateUrl: './add-hotel.component.html',
    styleUrl: './add-hotel.component.scss'
})
export class AddHotelComponent implements OnInit {
    hotelForm: FormGroup;
    cities: City[] = [];

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private cityService: CityService
    ) {
        this.hotelForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            titleIntroduct: ['', [Validators.required, Validators.minLength(3)]],
            contentIntroduct: ['', [Validators.required, Validators.minLength(10)]],
            phoneNumber: ['', [Validators.required, phoneNumberValidator]],
            address: ['', [Validators.required, Validators.minLength(5)]],
            cityId: [null, Validators.required],
            pictures: [[]]
        });
    }

    ngOnInit(): void {
        this.getCities();
    }

    onPicturesSelect(event: any): void {
        const files: File[] = event.files ? Array.from(event.files) : [];
        this.hotelForm.patchValue({ pictures: files });
        this.hotelForm.get('pictures')?.markAsTouched();
    }

    submitHotel(): void {
        if (this.hotelForm.valid) {
            console.log('Hotel data:', this.hotelForm.value);
            // Thêm logic để gửi dữ liệu đến server
        } else {
            this.hotelForm.markAllAsTouched();
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
