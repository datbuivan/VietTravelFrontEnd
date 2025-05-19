import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { ImageModule } from 'primeng/image';
interface Tour {
    image: string;
    title: string;
    price: string;
    discountPrice: string;
    rating: string;
    days: string;
    people: string;
    location: string;
}
@Component({
    selector: 'app-newtour',
    imports: [CommonModule, ButtonModule, CardModule, ImageModule],
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
                image: 'https://res.cloudinary.com/docff5snu/image/upload/v1746984611/cities/3/hanoi.jpg',
                title: 'Tour cheo sup',
                price: '60,000₫',
                discountPrice: '50,000₫',
                rating: '0/0',
                days: '1 ngày',
                people: '5+',
                location: 'Quy Nhơn'
            },
            {
                image: 'https://res.cloudinary.com/docff5snu/image/upload/v1747031044/cities/6/phuquoc.jpg',
                title: 'Tour Kỳ Co - Eo Gió 1ngày: Trời...',
                price: '360,000₫',
                discountPrice: '300,000₫',
                rating: '0/0',
                days: '1 ngày',
                people: '5+',
                location: 'Quy Nhơn'
            },
            {
                image: 'https://res.cloudinary.com/docff5snu/image/upload/v1747031272/cities/11/yenbai.jpg',
                title: 'Tour Hòn Khô - Lặn ngắm san hô...',
                price: '120,000₫',
                discountPrice: '100,000₫',
                rating: '0/0',
                days: '1 ngày',
                people: '5+',
                location: 'Quy Nhơn'
            },
            {
                image: 'https://res.cloudinary.com/docff5snu/image/upload/v1747031044/cities/6/phuquoc.jpg',
                title: 'Tour Kỳ Co - Eo Gió 1ngày: Trời...',
                price: '360,000₫',
                discountPrice: '300,000₫',
                rating: '0/0',
                days: '1 ngày',
                people: '5+',
                location: 'Quy Nhơn'
            },
            {
                image: 'https://res.cloudinary.com/docff5snu/image/upload/v1747031272/cities/11/yenbai.jpg',
                title: 'Tour Hòn Khô - Lặn ngắm san hô...',
                price: '120,000₫',
                discountPrice: '100,000₫',
                rating: '0/0',
                days: '1 ngày',
                people: '5+',
                location: 'Quy Nhơn'
            }
        ];
    }
}
