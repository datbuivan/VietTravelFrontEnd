import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@app/services/common/auth.service';
import { ReviewService } from '@app/services/user/review.service';
import { Review } from '@app/shared/models/review';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { Textarea } from 'primeng/textarea';

@Component({
    selector: 'app-review',
    standalone: true,
    imports: [CommonModule, RatingModule, FormsModule, ReactiveFormsModule, ButtonModule, Textarea],
    templateUrl: './review.component.html',
    styleUrl: './review.component.scss'
})
export class ReviewComponent implements OnInit {
    @Input() tourId!: number;
    canReview: boolean = false;
    reviewForm: FormGroup;
    reviews: Review[] = [];
    loading = true;
    isSubmitting = false;

    constructor(
        private fb: FormBuilder,
        private reviewService: ReviewService,
        private messageService: MessageService,
        private authService: AuthService
    ) {
        this.reviewForm = this.fb.group({
            type: [0],
            rating: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
            comment: ['', [Validators.required, Validators.maxLength(500)]],
            tourId: [null],
            hotelId: [null]
        });
    }

    ngOnInit(): void {
        this.loadReviews();
        // this.reviewService.CanUserReviewAsync(this.tourId, undefined).subscribe({
        //     next: (canReview) => {
        //         this.canReview = canReview;
        //         this.loadReviews();
        //     },
        //     error: (error) => {
        //         console.error('Lỗi khi kiểm tra quyền đánh giá:', error);
        //         this.canReview = false;
        //         this.loadReviews();
        //         this.messageService.add({
        //             severity: 'error',
        //             summary: 'Lỗi',
        //             detail: 'Không thể kiểm tra quyền đánh giá. Vui lòng thử lại.',
        //             life: 3000
        //         });
        //     }
        // });
    }

    loadReviews(): void {
        this.reviewService.getReviewsByTourId(this.tourId).subscribe({
            next: (reviews) => {
                this.reviews = reviews;
                this.loading = false;
            },
            error: (error) => {
                this.loading = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Lỗi',
                    detail: 'Không thể tải đánh giá. Vui lòng thử lại.',
                    life: 3000
                });
                console.error('Lỗi khi tải đánh giá:', error);
            }
        });
    }
    onSubmit(): void {
        if (this.reviewForm.invalid) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Cảnh báo',
                detail: 'Vui lòng điền đầy đủ và đúng thông tin đánh giá.',
                life: 3000
            });
            this.reviewForm.markAllAsTouched();
            return;
        }

        this.isSubmitting = true;
        const newReview: Review = {
            ...this.reviewForm.value,
            createdAt: new Date().toISOString()
        };

        this.reviewService.createReviewAsync(newReview).subscribe({
            next: (savedReview) => {
                this.reviews.push(savedReview);
                this.reviewForm.reset({ type: 0, tourId: this.tourId, hotelId: null });
                this.isSubmitting = false;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Thành công',
                    detail: 'Đánh giá của bạn đã được gửi thành công!',
                    life: 3000
                });
            },
            error: (error) => {
                this.isSubmitting = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Lỗi',
                    detail: 'Không thể gửi đánh giá. Vui lòng thử lại.',
                    life: 3000
                });
                console.error('Lỗi khi gửi đánh giá:', error);
            }
        });
    }
}
