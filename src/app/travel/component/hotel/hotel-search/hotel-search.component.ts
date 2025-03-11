import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Rating } from 'primeng/rating';
import { Slider } from 'primeng/slider';

@Component({
    selector: 'app-hotel-search',
    imports: [ButtonModule, Slider, FormsModule, Rating],
    templateUrl: './hotel-search.component.html',
    styleUrl: './hotel-search.component.scss',
    standalone: true
})
export class HotelSearchComponent implements OnInit {
    value!: number;
    value2!: number;

    ngOnInit(): void {
        this.value = 4.6;
    }
}
