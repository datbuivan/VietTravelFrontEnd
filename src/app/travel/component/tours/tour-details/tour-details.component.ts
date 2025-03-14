import { DatePickerModule } from 'primeng/datepicker';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { TourService } from '../../../services/tour.service';
import { AccordionModule } from 'primeng/accordion';

@Component({
    selector: 'app-tour-details',
    imports: [BreadcrumbModule, RouterModule, CommonModule, FormsModule, GalleriaModule, ButtonModule, DatePickerModule, AccordionModule],
    templateUrl: './tour-details.component.html',
    styleUrl: './tour-details.component.scss',
    standalone: true
})
export class TourDetailsComponent implements OnInit {
    items = [
        { icon: 'pi pi-home', route: '/' },
        { label: 'Tour', route: '/tour' },
        { label: 'Hà Nội', route: '/tour/1' }
    ];
    tour?: any;
    selectedDate: Date | null = null;
    selectedMonth: string = '';
    months = this.getNextFourMonths();

    images = [
        {
            itemImageSrc: 'images/uploadImage/haiphongcity.jpg',
            thumbnailImageSrc: 'images/uploadImage/haiphongcity.jpg',
            alt: 'Hải Phòng CiTy',
            title: 'Hải Phòng CiTy'
        },
        {
            itemImageSrc: 'images/uploadImage/vinhHaLong.jpg',
            thumbnailImageSrc: 'images/uploadImage/vinhHaLong.jpg',
            alt: 'Vịnh Hạ Long ',
            title: 'Vịnh Hạ Long'
        },
        {
            itemImageSrc: 'images/uploadImage/hochiminhcity.jpg',
            thumbnailImageSrc: 'images/uploadImage/hochiminhcity.jpg',
            alt: 'Thanh Hoá City',
            title: 'Thanh Hoá City'
        }
    ];
    @ViewChild('scheduleSection') scheduleSection!: ElementRef;
    constructor(
        private activatedRoute: ActivatedRoute,
        private tourService: TourService
    ) {}
    ngOnInit(): void {}
    loadTour() {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        if (id) {
            this.tour = this.tourService.getTour(+id);
        }
    }
    scrollToSchedule() {
        this.scheduleSection.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    getNextFourMonths() {
        const today = new Date();
        return Array.from({ length: 4 }, (_, i) => {
            const month = new Date(today.getFullYear(), today.getMonth() + i, 1);
            return { label: `${month.getMonth() + 1}/${month.getFullYear()}`, value: this.formatMonth(month) };
        });
    }
    formatMonth(date: Date): string {
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    }

    // Khi chọn tháng, cập nhật DatePicker
    changeMonth(monthStr: string) {
        const [year, month] = monthStr.split('-').map(Number);
        this.selectedDate = new Date(year, month - 1, 1);
        this.selectedMonth = monthStr;
    }
    ResetDate() {
        this.selectedDate = null;
    }
}
