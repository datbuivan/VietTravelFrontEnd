import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/common/auth.service';
import { TourService } from '@app/services/common/tour.service';
import { BookingService } from '@app/services/user/booking.service';
import { PaymentService } from '@app/services/user/payment.service';
import { Tour } from '@app/shared/models/tour';
import { User } from '@app/shared/models/user';
import { UserDto } from '@app/shared/models/user-dto';
import { VndCurrencyPipe, VndPipe } from '@app/shared/pipes/vnd.pipe';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { ImageModule } from 'primeng/image';
import { InputNumber } from 'primeng/inputnumber';
import { StepperModule } from 'primeng/stepper';
import { StepsModule } from 'primeng/steps';

@Component({
    selector: 'app-booking',
    standalone: true,
    imports: [ButtonModule, ImageModule, StepperModule, CommonModule, ReactiveFormsModule, FormsModule, InputNumber, VndCurrencyPipe, FieldsetModule, StepsModule],
    templateUrl: './booking.component.html',
    styleUrl: './booking.component.scss'
})
export class BookingComponent implements OnInit {
    pricingForm!: FormGroup;
    activeStep: number = 1;
    tourId: number | null = null;
    startDateId: number | null = null;
    tour!: Tour;
    childTotalPrice = 0;
    adultTotalPrice = 0;
    totalPrice = 0;
    user: UserDto | null = null;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private bookingService: BookingService,
        private tourService: TourService,
        private authService: AuthService,
        private paymentService: PaymentService
    ) {
        this.pricingForm = this.fb.group({
            adults: new FormControl(1, [Validators.required, Validators.min(1)]),
            childs: new FormControl(0, Validators.required)
        });
    }

    submitPayment() {
        console.log('payment');
        if (this.pricingForm.invalid) {
            this.pricingForm.markAllAsTouched();
            return;
        }

        const formValue = this.pricingForm.value;

        const totalPrice = this.totalPrice;
        const type = 0;
        const adults = formValue.adults;
        const children = formValue.childs;
        const tourId = this.tourId;
        const tourStartDateId = this.startDateId;
        const userId = this.user?.id;

        if (!userId) {
            console.error('Người dùng chưa đăng nhập.');
            return;
        }
        if (tourId && tourStartDateId)
            this.paymentService.generatePaymentUrl(totalPrice, type, userId, adults, children, tourId, tourStartDateId).subscribe({
                next: (res) => {
                    window.location.href = res.paymentUrl;
                },
                error: (err) => {
                    console.error('Lỗi khi tạo URL thanh toán:', err);
                }
            });
    }

    goPayment(step: number) {
        this.activeStep = step;
    }

    ngOnInit(): void {
        const data = this.bookingService.getBookingData();
        this.tourId = data.tourId;
        this.startDateId = data.startDateId;

        if (this.tourId == null || this.startDateId == null) {
            this.router.navigate(['/tours']);
        }
        if (this.tourId) this.loadTour(this.tourId);
        this.loadUser();
    }
    loadTour(id: number) {
        this.tourService.getTour(id).subscribe({
            next: (res) => {
                this.tour = res;
                this.updateTotal();
            },
            error: (err) => {
                console.error(err);
            }
        });
    }

    loadUser() {
        this.authService.getCurrentUser().subscribe({
            next: (res) => {
                this.user = res;
            },
            error: (error) => {
                console.log(error);
            }
        });
    }

    updateTotal() {
        const childCount = this.pricingForm.get('childs')?.value || 0;
        const adultCount = this.pricingForm.get('adults')?.value || 0;
        if (this.tour) {
            this.childTotalPrice = childCount * this.tour.childPrice;
            this.adultTotalPrice = adultCount * this.tour.price;
            this.totalPrice = this.childTotalPrice + this.adultTotalPrice;
        } else {
            this.totalPrice = 0;
        }
    }

    increaseQuantity(type: string) {
        const control = this.pricingForm.get(type);
        if (control?.value < 100) {
            control?.setValue(control.value + 1);
            this.updateTotal();
        }
    }

    decreaseQuantity(type: string) {
        const control = this.pricingForm.get(type);
        if (control?.value > 0) {
            control?.setValue(control.value - 1);
            this.updateTotal();
        }
    }

    goBack(id: number) {
        if (id) this.router.navigate(['/tours', id]);
    }
}
