import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { City } from '@shared/models/city';
import { CityService } from '@services/common/city.service';
import { TourService } from '@app/services/common/tour.service';
import { Tour } from '@app/shared/models/tour';
import { ImageDto } from '@app/shared/models/image-dto';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-add-tour',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, InputTextModule, InputNumberModule, SelectModule, FileUploadModule, ButtonModule, RouterModule, ToastModule],
    templateUrl: './add-tour.component.html',
    styleUrl: './add-tour.component.scss',
    providers: [MessageService]
})
export class AddTourComponent implements OnInit {
    tourForm: FormGroup;
    tourId!: number;
    cities: City[] = [];
    tour!: Tour;
    isEditMode = false;

    previewImages: string[] = [];
    existingImages: ImageDto[] = [];
    newImageFiles: File[] = [];

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private cityService: CityService,
        private tourService: TourService,
        private messageService: MessageService
    ) {
        this.tourForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            price: [0, [Validators.required, Validators.min(0)]],
            childPrice: [0, [Validators.required, Validators.min(0)]],
            singleRoomSurcharge: [0, [Validators.required, Validators.min(0)]],
            cityId: [null, Validators.required],
            images: [[]]
        });
    }

    ngOnInit(): void {
        this.getCities();
        this.isEditMode = !!this.route.snapshot.paramMap.get('id');
        if (this.isEditMode) {
            this.loadTourData();
        }
    }

    loadTourData(): void {
        const idParam = this.route.snapshot.paramMap.get('id');
        if (idParam) {
            this.tourId = +idParam;
            this.isEditMode = true;
            this.tourService.getTour(this.tourId!).subscribe({
                next: (response) => {
                    this.tour = response;
                    this.tourForm.patchValue({
                        name: this.tour.name,
                        price: this.tour.price,
                        childPrice: this.tour.childPrice,
                        singleRoomSurcharge: this.tour.singleRoomSurcharge,
                        cityId: this.tour.cityId
                    });
                    this.existingImages = this.tour.images || [];
                },
                error: (error) => console.error('Error loading tour data:', error)
            });
        }
    }

    onPicturesSelect(event: any): void {
        const files: File[] = event.files ? Array.from(event.files) : [];

        const newUniqueFiles: File[] = [];
        const duplicateFiles: File[] = [];

        files.forEach((newFile) => {
            const isDuplicate = this.newImageFiles.some((existingFile) => existingFile.name === newFile.name && existingFile.size === newFile.size && existingFile.lastModified === newFile.lastModified);
            if (!isDuplicate) {
                newUniqueFiles.push(newFile);
            } else {
                duplicateFiles.push(newFile);
            }
        });

        this.newImageFiles = [...this.newImageFiles, ...newUniqueFiles];
        newUniqueFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.previewImages.push(e.target.result as string);
            };
            reader.readAsDataURL(file);
        });

        if (duplicateFiles.length > 0) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Cảnh báo',
                detail: `file ${duplicateFiles.length} đã được thêm vào: ${duplicateFiles.map((f) => f.name).join(', ')}`
            });
        }

        this.tourForm.patchValue({ images: this.newImageFiles });
        this.tourForm.get('images')?.markAsTouched();
    }

    removePicture(index: number): void {
        this.newImageFiles.splice(index, 1);
        this.previewImages.splice(index, 1);
        this.tourForm.patchValue({ pictures: this.newImageFiles });
    }

    removeExistingPicture(index: number): void {
        this.existingImages.splice(index, 1);
        this.tourForm.patchValue({ pictures: this.newImageFiles });
    }

    submitTour(): void {
        if (this.tourForm.valid) {
            console.log('Tour data:', this.tourForm.value);
            const formData = new FormData();
            formData.append('name', this.tourForm.get('name')?.value);
            formData.append('price', this.tourForm.get('price')?.value.toString());
            formData.append('childPrice', this.tourForm.get('childPrice')?.value.toString());
            formData.append('singleRoomSurcharge', this.tourForm.get('singleRoomSurcharge')?.value.toString());
            formData.append('cityId', this.tourForm.get('cityId')?.value.toString());

            this.newImageFiles.forEach((file) => {
                formData.append('images', file);
            });

            if (this.isEditMode) {
                const existingIds = this.existingImages.map((img) => img.id) || [];
                const jsonString = JSON.stringify(existingIds);
                formData.append('existingImageIdsJson', jsonString);
                console.log('ExistingPictureIdsJson sent (as string):', jsonString);
                console.log('Type of jsonString:', typeof jsonString);
                for (let [key, value] of formData.entries()) {
                    if (value instanceof File) {
                        console.log(`${key}:`);
                        console.log('  name:', value.name);
                        console.log('  size:', value.size, 'bytes');
                        console.log('  type:', value.type);
                    } else {
                        console.log(`${key}: ${value}`);
                    }
                }
                this.tourService.editTour(formData, this.tourId).subscribe({
                    next: (response) => {
                        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Tour đã được cập nhật!', life: 3000 });
                        this.router.navigate(['/admin/tours']);
                    },
                    error: (error) => {
                        let errorMessage = 'Không thể cập nhật tour!';
                        // Xử lý lỗi cụ thể từ backend
                        if (error.status === 404) {
                            errorMessage = 'Tour không tồn tại!';
                        } else if (error.status === 500 && error.error?.message) {
                            if (error.error.message.includes('Không thể xóa hết ảnh')) {
                                errorMessage = 'Vui lòng giữ lại ít nhất một ảnh hoặc thêm ảnh mới.';
                            } else if (error.error.message.includes('Tour phải có ít nhất một ảnh chính')) {
                                errorMessage = 'Tour phải có ít nhất một ảnh chính. Vui lòng chọn hoặc thêm ảnh.';
                            } else {
                                errorMessage = `Lỗi server: ${error.error.message}`;
                            }
                        } else if (error.status === 400) {
                            errorMessage = 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại thông tin.';
                        }
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Lỗi',
                            detail: errorMessage
                        });
                        console.error('Error updating tour:', error);
                    }
                });
            } else {
                this.tourService.addTour(formData).subscribe({
                    next: (response) => {
                        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Tour đã được thêm mới!', life: 3000 });
                        this.router.navigate(['/admin/tours']);
                    },
                    error: (error) => {
                        this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Không thể thêm tour!' });
                        console.error('Error adding tour:', error);
                    }
                });
            }
        } else {
            console.log('Form is invalid');
            this.tourForm.markAllAsTouched();
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
