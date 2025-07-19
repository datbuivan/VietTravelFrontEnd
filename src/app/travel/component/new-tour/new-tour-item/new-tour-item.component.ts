import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@app/services/common/auth.service';
import { TourFavoriteService } from '@app/services/user/tour-favorite.service';
import { Tour } from '@app/shared/models/tour';
import { User } from '@app/shared/models/user';
import { VndCurrencyPipe } from '@app/shared/pipes/vnd.pipe';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'app-new-tour-item',
    standalone: true,
    imports: [CommonModule, ButtonModule, VndCurrencyPipe, ToastModule, RouterModule],
    templateUrl: './new-tour-item.component.html',
    styleUrl: './new-tour-item.component.scss',
    providers: [MessageService]
})
export class NewTourItemComponent {
    @Input() tour!: Tour;
    isFavorite: boolean | null = null;
    tour$: Observable<Tour | null> = of(null);
    error: string | null = null;
    loading = true;
    currentUser: User | null = null;
    constructor(
        private tourFavoriteService: TourFavoriteService,
        private messageService: MessageService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.loadUser();
    }
    loadFavorite(tourId: number) {
        this.tourFavoriteService.isFavorite(tourId).subscribe((isFavorite) => {
            this.isFavorite = isFavorite;
        });
    }

    loadUser() {
        this.currentUser = this.authService.currentUserValue;
        if (this.currentUser) {
            this.loadFavorite(this.tour.id);
        }
    }

    addFavorite(tourId: number) {
        if (!this.currentUser) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Chưa đăng nhập',
                detail: 'Vui lòng đăng nhập để thêm tour vào danh sách yêu thích.',
                life: 3000
            });
            return;
        }
        if (this.currentUser && this.isFavorite) {
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
