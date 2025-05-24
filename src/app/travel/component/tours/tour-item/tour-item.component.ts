import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { VndCurrencyPipe } from '@shared/pipes/vnd.pipe';
import { CommonModule } from '@angular/common';
import { Tour } from '@app/shared/models/tour';
import { TourService } from '@app/services/common/tour.service';
import { catchError, map, Observable, of } from 'rxjs';
import { TourFavoriteService } from '@app/services/user/tour-favorite.service';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-tour-item',
    standalone: true,
    imports: [CommonModule, ButtonModule, RouterModule, VndCurrencyPipe, MessageModule, ToastModule],
    templateUrl: './tour-item.component.html',
    styleUrl: './tour-item.component.scss',
    providers: [MessageService]
})
export class TourItemComponent implements OnInit {
    @Input() tour!: Tour;
    isFavorite: boolean | null = null;
    tour$: Observable<Tour | null> = of(null);
    error: string | null = null;
    loading = true;

    constructor(
        private tourService: TourService,
        private route: ActivatedRoute,
        private tourFavoriteService: TourFavoriteService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        if (!this.tour) {
            const tourIdStr = this.route.snapshot.paramMap.get('id');
            const tourId = tourIdStr ? parseInt(tourIdStr, 10) : 0;
            this.fetchTour(tourId);
        } else {
            this.tour$ = of(this.tour);
        }
        this.tourFavoriteService.isFavorite(this.tour.id).subscribe((isFavorite) => {
            this.isFavorite = isFavorite;
        });
    }

    private fetchTour(id: number) {
        this.loading = true;
        this.tourService.getTour(id).subscribe({
            next: (res) => {
                this.tour = res;
                console.log('Tour:', this.tour);
            },
            error: (err) => {
                console.error(err);
            }
        });
    }

    addFavorite(tourId: number) {
        if (this.isFavorite) {
            this.tourFavoriteService.removeFavorite(tourId).subscribe({
                next: () => {
                    this.isFavorite = false;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Xoá thành công',
                        detail: 'Tour đã được xoá khỏi danh sách yêu thích.',
                        life: 3000
                    });
                },
                error: (error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Xoá thất bại',
                        detail: 'Xảy ra lỗi khi xoá. Vui lòng thử lại.',
                        life: 3000
                    });
                    console.log('Error removing favorite tour: ', error);
                }
            });
        } else {
            this.tourFavoriteService.addFavorite(tourId).subscribe({
                next: () => {
                    this.isFavorite = true;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Thêm thành công',
                        detail: 'Tour đã được thêm vào danh sách yêu thích.',
                        life: 3000
                    });
                },
                error: (error) => {
                    console.log('Error : ', error);
                    if (error.message === 'Tour already in favorites') {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Thêm thành công',
                            detail: 'Tour đã có trong danh sách yêu thích.'
                        });
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Thêm thất bại',
                            detail: 'Xảy ra lỗi khi thêm. Vui lòng thử lại.',
                            life: 3000
                        });
                    }
                    console.log('Error adding favorite tour: ', error);
                }
            });
        }
    }
}
