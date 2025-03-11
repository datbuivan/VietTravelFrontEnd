import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
interface Tour {
    name: string;
    imageUrl: string;
    price: number;
}
@Component({
    selector: 'app-newtour',
    imports: [ButtonModule, CarouselModule],
    templateUrl: './new-tour.component.html',
    styleUrl: './new-tour.component.scss',
    standalone: true
})
export class NewTourComponent implements OnInit {
    tours: Tour[] = [];

    responsiveOptions: any[] | undefined;

    ngOnInit(): void {
        this.tours = [
            {
                name: 'Tour Hà Nội',
                imageUrl: 'hanoicity.jpg',
                price: 7000000
            },
            {
                name: 'Tour Sài Gòn',
                imageUrl: 'nhathoducbatour.jpg',
                price: 7000000
            },
            {
                name: 'Tour Vân Đồn',
                imageUrl: 'vandontour.jpg',
                price: 7000000
            },
            {
                name: 'Tour Yên Tử',
                imageUrl: 'yentutour.jpg',
                price: 7000000
            }
        ];
        this.responsiveOptions = [
            {
                breakpoint: '1400px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '1199px',
                numVisible: 4,
                numScroll: 1
            },
            {
                breakpoint: '767px',
                numVisible: 1,
                numScroll: 1
            },
            {
                breakpoint: '575px',
                numVisible: 1,
                numScroll: 1
            }
        ];
    }
}
