import { DatePickerModule } from 'primeng/datepicker';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { TourService } from '@services/common/tour.service';
import { OverviewComponent } from '@travel/component/tours/overview/overview.component';
import { TourNoteComponent } from '@travel/component/tours/tour-note/tour-note.component';
import { DialogModule } from 'primeng/dialog';
import { CarouselModule } from 'primeng/carousel';

interface Month {
    label: string;
    value: number;
}

@Component({
    selector: 'app-tour-details',
    imports: [CommonModule, BreadcrumbModule, RouterModule, CommonModule, FormsModule, ButtonModule, DatePickerModule, OverviewComponent, TourNoteComponent, DialogModule, CarouselModule],
    templateUrl: './tour-details.component.html',
    styleUrl: './tour-details.component.scss',
    standalone: true
})
export class TourDetailsComponent implements OnInit {
    @ViewChild('scheduleSection') scheduleSection!: ElementRef;
    displayDialog: boolean = false;
    items = [
        { icon: 'pi pi-home', route: '/' },
        { label: 'Tour', route: '/tour' },
        { label: 'Hà Nội', route: '/tour/1' }
    ];
    tour?: any;
    months: Month[] = [];
    selectedMonth: number | null = new Date().getMonth() + 1;
    selectedDate: Date | null = null;
    minDate: Date = new Date();
    maxDate: Date = new Date(new Date().setFullYear(new Date().getFullYear(), 11, 31));
    images = [
        { itemImageSrc: 'https://res.cloudinary.com/docff5snu/image/upload/v1746984611/cities/3/hanoi.jpg', thumbnailImageSrc: 'https://res.cloudinary.com/docff5snu/image/upload/v1746984611/cities/3/hanoi.jpg' },
        { itemImageSrc: 'https://res.cloudinary.com/docff5snu/image/upload/v1747029366/cities/19/hoian.jpg', thumbnailImageSrc: 'https://res.cloudinary.com/docff5snu/image/upload/v1747029366/cities/19/hoian.jpg' },
        { itemImageSrc: 'https://res.cloudinary.com/docff5snu/image/upload/v1747030507/cities/4/hatinh.jpg', thumbnailImageSrc: 'https://res.cloudinary.com/docff5snu/image/upload/v1747030507/cities/4/hatinh.jpg' },
        { itemImageSrc: 'https://res.cloudinary.com/docff5snu/image/upload/v1747030985/cities/5/haiphong.jpg', thumbnailImageSrc: 'https://res.cloudinary.com/docff5snu/image/upload/v1747030985/cities/5/haiphong.jpg' },
        { itemImageSrc: 'https://res.cloudinary.com/docff5snu/image/upload/v1747031044/cities/6/phuquoc.jpg', thumbnailImageSrc: 'https://res.cloudinary.com/docff5snu/image/upload/v1747031044/cities/6/phuquoc.jpg' },
        { itemImageSrc: 'https://res.cloudinary.com/docff5snu/image/upload/v1747031095/cities/7/hanam.jpg', thumbnailImageSrc: 'https://res.cloudinary.com/docff5snu/image/upload/v1747031095/cities/7/hanam.jpg' }
    ];
    constructor(
        private activatedRoute: ActivatedRoute,
        private tourService: TourService
    ) {
        this.generateMonths();
        this.adjustMinDateTime();
    }
    ngOnInit(): void {}
    loadTour() {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        if (id) {
            this.tour = this.tourService.getTour(+id);
        }
    }
    generateMonths() {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;

        for (let i = 0; i < 4; i++) {
            const monthValue = ((currentMonth + i - 1) % 12) + 1;
            this.months.push({
                label: `Tháng ${monthValue}`,
                value: monthValue
            });
        }
    }

    adjustMinDateTime() {
        const now = new Date();
        this.minDate.setHours(now.getHours(), now.getMinutes(), 0, 0);
    }

    changeMonth(month: number) {
        this.selectedMonth = month;
        if (this.selectedDate) {
            const newDate = new Date(this.selectedDate);
            newDate.setMonth(month - 1);
            // this.selectedDate = newDate;
        } else {
            this.selectedDate = new Date(new Date().getFullYear(), month - 1, 1);
        }
    }

    scrollToSchedule() {
        this.scheduleSection.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    resetDate() {
        this.selectedDate = null;
    }

    showDialog() {
        this.displayDialog = true;
    }

    hideDialog() {
        this.displayDialog = false;
    }
}
