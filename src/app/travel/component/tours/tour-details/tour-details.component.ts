import { VndCurrencyPipe } from '@shared/pipes/vnd.pipe';
import { DatePickerModule, DatePickerMonthChangeEvent, DatePickerTypeView } from 'primeng/datepicker';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { TourService } from '@services/common/tour.service';
import { OverviewComponent } from '@travel/component/tours/overview/overview.component';
import { TourNoteComponent } from '@travel/component/tours/tour-note/tour-note.component';
import { DialogModule } from 'primeng/dialog';
import { CarouselModule } from 'primeng/carousel';
import { Tour } from '@app/shared/models/tour';
import { BookingService } from '@app/services/user/booking.service';
import { ReviewComponent } from '@travel/component/tours/review/review.component';
import { AccordionModule } from 'primeng/accordion';
import { LinebreakPipe } from '@app/shared/pipes/linebreak.pipe';

interface Month {
    label: string;
    value: number;
}

@Component({
    selector: 'app-tour-details',
    imports: [
        CommonModule,
        BreadcrumbModule,
        RouterModule,
        CommonModule,
        FormsModule,
        ButtonModule,
        DatePickerModule,
        OverviewComponent,
        TourNoteComponent,
        DialogModule,
        CarouselModule,
        ReactiveFormsModule,
        ReviewComponent,
        VndCurrencyPipe,
        AccordionModule,
        LinebreakPipe
    ],
    templateUrl: './tour-details.component.html',
    styleUrl: './tour-details.component.scss',
    standalone: true
})
export class TourDetailsComponent implements OnInit {
    @ViewChild('scheduleSection') scheduleSection!: ElementRef;
    displayDialog: boolean = false;
    activePanel: string = '0';
    items = [
        { icon: 'pi pi-home', route: '/' },
        { label: 'Tour', route: '/tour' },
        { label: 'Hà Nội', route: '/tour/1' }
    ];
    tour!: Tour;
    tourId: number | null = null;
    months: Month[] = [];
    selectedMonth: number = new Date().getMonth() + 1;
    minDate: Date = new Date();
    maxDate: Date = new Date(new Date().setFullYear(new Date().getFullYear(), 11, 31));
    bookingForm: FormGroup;
    disabledDates: Date[] = [];
    selectedTourDateId: number | null = null;
    defaultDate: Date = new Date();
    constructor(
        private route: ActivatedRoute,
        private tourService: TourService,
        private fb: FormBuilder,
        private router: Router,
        private bookingService: BookingService
    ) {
        this.bookingForm = this.fb.group({
            selectedDate: [null]
        });
        this.generateMonths();
        this.adjustMinDateTime();
    }
    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.tourId = id ? +id : 0;
        this.fetchTour(this.tourId);
        this.updateDisabledDates();
    }

    fetchTour(id: number) {
        this.tourService.getTour(id).subscribe({
            next: (res) => {
                this.tour = res;
                this.generateMonths();
                this.updateDisabledDates();
            },
            error: (err) => {
                console.error(err);
            }
        });
    }

    bookTour() {
        if (this.tourId != null && this.selectedTourDateId != null) {
            this.bookingService.setBookingData(this.tourId, this.selectedTourDateId);
            this.router.navigate(['/order-booking']);
        } else {
            console.warn('Không thể thanh toán: ', {
                tourId: this.tourId,
                selectedTourDateId: this.selectedTourDateId
            });
        }
    }

    updateDisabledDates() {
        this.disabledDates = [];

        if (!this.tour?.tourStartDates?.length) {
            const startDate = new Date(2025, this.selectedMonth - 1, 1);
            const endDate = new Date(2025, this.selectedMonth, 0);
            while (startDate <= endDate) {
                this.disabledDates.push(new Date(startDate));
                startDate.setDate(startDate.getDate() + 1);
            }
            return;
        }

        const startDates: Date[] = this.tour.tourStartDates
            .map((item) => new Date(item.startDate)) // Chuyển chuỗi ISO thành Date
            .filter((date): date is Date => date instanceof Date && !isNaN(date.getTime()));

        const startDate = new Date(2025, this.selectedMonth - 1, 1);
        const endDate = new Date(2025, this.selectedMonth, 0);

        while (startDate <= endDate) {
            const currentDate = new Date(startDate);
            if (!startDates.some((d) => d.getFullYear() === currentDate.getFullYear() && d.getMonth() === currentDate.getMonth() && d.getDate() === currentDate.getDate())) {
                this.disabledDates.push(new Date(currentDate));
            }
            startDate.setDate(startDate.getDate() + 1);
        }
    }
    generateMonths() {
        this.months = [];
        const currentMonth = new Date().getMonth() + 1;
        for (let month = currentMonth; month <= 12; month++) {
            this.months.push({
                label: `Tháng ${month}`,
                value: month
            });
        }

        if (this.months.length > 0 && !this.months.some((m) => m.value === this.selectedMonth)) {
            this.selectedMonth = this.months[0].value;
            this.resetFormDate();
            this.updateDisabledDates();
        }
    }

    onDateSelect(event: any): void {
        const selectedDate = new Date(event);
        if (!this.tour || !this.tour.tourStartDates) {
            // this.resetFormDate();
            return;
        }
        const selectedTourDate = this.tour.tourStartDates.find((item) => {
            const tourDate = new Date(item.startDate);
            return tourDate.getFullYear() === selectedDate.getFullYear() && tourDate.getMonth() === selectedDate.getMonth() && tourDate.getDate() === selectedDate.getDate();
        });
        if (selectedTourDate) {
            this.selectedTourDateId = selectedTourDate.id ?? null;
            this.bookingForm.patchValue({
                selectedDate: selectedDate
            });
        }
    }

    changeMonth(month: number) {
        this.selectedMonth = month;
        if (this.tour && this.tour.tourStartDates && this.tour.tourStartDates.length > 0) {
            const startDates = this.tour.tourStartDates.map((item) => ({ id: item.id, date: new Date(item.startDate) })).filter((item) => item.date.getFullYear() === 2025 && item.date.getMonth() === this.selectedMonth - 1);

            startDates.sort((a, b) => a.date.getTime() - b.date.getTime());

            if (startDates.length > 0) {
                const earliestDate = startDates[0].date;
                this.selectedTourDateId = startDates[0].id ?? null;
                this.bookingForm.patchValue({ selectedDate: earliestDate });
            } else {
                this.resetFormDate();
                this.defaultDate = new Date(2025, this.selectedMonth - 1, 1);
                this.selectedTourDateId = null;
                // this.viewDate = new Date(2025, this.selectedMonth - 1, 1);
            }
        } else {
            this.resetFormDate();
            this.defaultDate = new Date(2025, this.selectedMonth - 1, 1);
            this.selectedTourDateId = null;
            // this.viewDate = new Date(2025, this.selectedMonth - 1, 1);
        }

        this.updateDisabledDates();
    }

    onMonthChange(event: DatePickerMonthChangeEvent): void {
        const newMonth = event.month;
        if (newMonth !== undefined && this.months.some((m) => m.value === newMonth)) {
            this.selectedMonth = newMonth;
            // this.bookingForm.patchValue({ selectedMonth: this.selectedMonth });
            this.updateDisabledDates();
        } else {
            console.warn('Month is undefined or not valid in month list:', newMonth);
        }
    }

    adjustMinDateTime() {
        const now = new Date();
        this.minDate.setHours(now.getHours(), now.getMinutes(), 0, 0);
    }

    resetFormDate() {
        this.bookingForm.patchValue({
            selectedDate: null
        });
    }
    showDialog() {
        this.displayDialog = true;
    }

    hideDialog() {
        this.displayDialog = false;
    }

    scrollToSchedule() {
        this.scheduleSection.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
