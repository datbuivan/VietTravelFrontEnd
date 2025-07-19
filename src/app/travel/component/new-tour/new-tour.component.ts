import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TourService } from '@app/services/common/tour.service';
import { Tour } from '@app/shared/models/tour';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { NewTourItemComponent } from './new-tour-item/new-tour-item.component';

@Component({
    selector: 'app-newtour',
    imports: [CommonModule, ButtonModule, CardModule, ImageModule, NewTourItemComponent],
    templateUrl: './new-tour.component.html',
    styleUrl: './new-tour.component.scss',
    standalone: true
})
export class NewTourComponent implements OnInit {
    tours: Tour[] = [];
    loading = true;
    responsiveOptions: any[] | undefined;

    constructor(
        private tourService: TourService,
        private messageService: MessageService
    ) {}
    ngOnInit(): void {
        this.loadTours();
    }
    loadTours(): void {
        this.tourService.getTours().subscribe({
            next: (tours) => {
                this.tours = tours;
                this.loading = false;
            },
            error: (error) => {
                this.loading = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Lỗi',
                    detail: error.message
                });
            }
        });
    }
}
