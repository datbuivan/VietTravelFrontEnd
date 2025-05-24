import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AuthService } from '@app/services/common/auth.service';
import { TourFavoriteService } from '@app/services/user/tour-favorite.service';
import { ApiResponse } from '@app/shared/models/api-response';
import { TourFavorite } from '@app/shared/models/tour-favorite';
import { TourFavoriteDto } from '@app/shared/models/tour-favorite-dto';
import { VndCurrencyPipe } from '@app/shared/pipes/vnd.pipe';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-tour-favorite',
    standalone: true,
    imports: [CommonModule, ButtonModule, VndCurrencyPipe, TableModule, MessageModule, ToastModule],
    templateUrl: './tour-favorite.component.html',
    styleUrl: './tour-favorite.component.scss',
    providers: [MessageService]
})
export class TourFavoriteComponent implements OnInit {
    favoriteTours: TourFavoriteDto[] = [];
    loading: boolean = false;
    constructor(
        private tourFavoriteService: TourFavoriteService,
        private sanitizer: DomSanitizer,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.loadFavoriteTours();
    }

    loadFavoriteTours() {
        this.loading = true;
        this.tourFavoriteService.getFavorites().subscribe({
            next: (response: TourFavoriteDto[]) => {
                this.favoriteTours = response;
                this.loading = false;
            },
            error: () => {
                this.loading = false;
                console.log('Error loading favorite tours');
            }
        });
    }

    removeFavorite(tourId: number) {
        this.tourFavoriteService.removeFavorite(tourId).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'infor',
                    summary: 'Xoá thành công',
                    detail: 'Tour đã được xoá khỏi danh sách yêu thích.',
                    life: 3000
                });
                this.loadFavoriteTours();
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
    }

    sanitizeUrl(url: string): SafeUrl {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }
}
