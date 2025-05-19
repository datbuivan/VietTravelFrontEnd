import { CityService } from '@app/services/common/city.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { TooltipModule } from 'primeng/tooltip';
import { Region } from '@app/shared/models/region';
import { RegionService } from '@app/services/common/region.service';
import { City } from '@app/shared/models/city';
import { ApiResponse } from '@app/shared/models/api-response';
import { CityDto } from '@app/shared/models/city-dto';

@Component({
    selector: 'app-add-city',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, SelectModule, InputTextModule, TextareaModule, DropdownModule, FileUploadModule, ButtonModule, TooltipModule, RouterModule],
    templateUrl: './add-city.component.html',
    styleUrl: './add-city.component.scss',
    providers: [MessageService]
})
export class AddCityComponent implements OnInit, OnDestroy {
    cityForm: FormGroup;
    regions: Region[] = [];

    isEditMode = false;
    city: City | null = null;
    cityId?: number;
    @ViewChild('fileInput') fileInput!: ElementRef;

    previewPicture: string | null = null;
    existingPicture: string | null = null;
    newPictureFile: File | null = null;

    constructor(
        private fb: FormBuilder,
        private messageService: MessageService,
        private route: ActivatedRoute,
        private router: Router,
        private cdr: ChangeDetectorRef,
        private regionService: RegionService,
        private CityService: CityService
    ) {
        this.cityForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            titleIntroduct: ['', [Validators.required, Validators.minLength(3)]],
            contentIntroduct: ['', [Validators.required, Validators.minLength(10)]],
            regionId: [null, Validators.required],
            pictures: [null]
        });
    }

    ngOnInit(): void {
        this.getRegions();
        this.isEditMode = !!this.route.snapshot.paramMap.get('id');
        if (this.isEditMode) {
            this.loadCityData();
        }
    }

    loadCityData(): void {
        const idParam = this.route.snapshot.paramMap.get('id');
        if (idParam) {
            this.cityId = +idParam;
            this.isEditMode = true;
        }
        this.CityService.getCity(this.cityId!).subscribe({
            next: (response) => {
                this.city = response;
                this.cityForm.patchValue({
                    name: this.city.name,
                    titleIntroduct: this.city.titleIntroduct,
                    contentIntroduct: this.city.contentIntroduct,
                    regionId: this.city.regionId
                });
                this.existingPicture = this.city.image?.url || null;
            },
            error: (error) => console.error(error)
        });
    }

    onPicturesSelect(event: any): void {
        const file: File = event.target.files ? event.target.files[0] : null;
        if (!file) {
            console.log('No file selected');
            return;
        }

        console.log('Files selected:', file);
        this.newPictureFile = file;
        this.cityForm.get('pictures')?.markAsTouched();

        const reader = new FileReader();
        reader.onload = () => {
            this.previewPicture = reader.result as string;
            this.cdr.detectChanges();
            console.log('Preview picture:', this.previewPicture);
        };

        reader.onerror = () => {
            this.messageService.add({
                severity: 'error',
                summary: 'Lỗi',
                detail: `Không thể đọc file ${file.name}`
            });
        };
        reader.readAsDataURL(file);
    }

    removeNewImage(): void {
        this.previewPicture = null;
        this.newPictureFile = null;
        this.fileInput.nativeElement.value = '';
        this.cdr.detectChanges();
    }

    removeExistingImage(): void {
        this.existingPicture = null;
        this.cityForm.get('pictures')?.setValue(null);
        this.cdr.detectChanges();
    }

    clearImages(): void {
        this.previewPicture = null;
        this.newPictureFile = null;
        this.fileInput.nativeElement.value = '';
        this.cdr.detectChanges();
    }

    formatFileSize(bytes: number): string {
        if (bytes === 0) return '0 KB';
        const k = 1024;
        const sizes = ['KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    getFileNameFromUrl(url: string): string {
        return url.split('/').pop()?.split('?')[0] || 'Unknown';
    }

    submitCity(): void {
        if (this.cityForm.valid) {
            const formData = new FormData();
            formData.append('name', this.cityForm.get('name')?.value);
            formData.append('titleIntroduct', this.cityForm.get('titleIntroduct')?.value);
            formData.append('contentIntroduct', this.cityForm.get('contentIntroduct')?.value);
            formData.append('regionId', this.cityForm.get('regionId')?.value);

            if (this.newPictureFile) {
                formData.append('primaryImage', this.newPictureFile);
            }

            console.log('FormData entries:');
            for (const pair of formData.entries()) {
                console.log(`${pair[0]}: ${pair[1]}`);
            }

            if (this.isEditMode && this.cityId) {
                this.CityService.updateCity(this.cityId, formData).subscribe({
                    next: (response: ApiResponse<CityDto>) => {
                        if (response.statusCode === 200) {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Thành công',
                                detail: response.message || 'Cập nhật thành phố thành công'
                            });
                            this.router.navigate(['/admin/cities']);
                        } else {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Lỗi',
                                detail: response.message || 'Không thể cập nhật thành phố'
                            });
                        }
                    },
                    error: (error) => {
                        console.error('Error updating city:', error);
                        const errorMessage = error.error?.message || 'Không thể cập nhật thành phố. Vui lòng thử lại.';
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Lỗi',
                            detail: errorMessage
                        });
                    }
                });
            } else {
                this.CityService.addCity(formData).subscribe({
                    next: (response: ApiResponse<CityDto>) => {
                        if (response.statusCode === 200) {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Thành công',
                                detail: response.message || 'Thêm thành phố thành công'
                            });
                            this.router.navigate(['/admin/cities']);
                        } else {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Lỗi',
                                detail: response.message || 'Không thể thêm thành phố'
                            });
                        }
                    },
                    error: (error) => {
                        console.error('Error adding city:', error);
                        const errorMessage = error.error?.message || 'Không thể thêm thành phố. Vui lòng thử lại.';
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Lỗi',
                            detail: errorMessage
                        });
                    }
                });
            }
        } else {
            this.cityForm.markAllAsTouched();
            this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Vui lòng điền đầy đủ thông tin' });
        }
    }

    resetForm(): void {
        this.cityForm.reset();
        this.previewPicture = null;
        this.existingPicture = null;
        this.newPictureFile = null;
        this.fileInput.nativeElement.value = '';
        this.cdr.detectChanges();
    }

    getRegions(): void {
        this.regionService.getRegions().subscribe({
            next: (response) => {
                this.regions = response;
            },
            error: (error) => console.error(error)
        });
    }
    ngOnDestroy(): void {
        this.resetForm();
    }
}
