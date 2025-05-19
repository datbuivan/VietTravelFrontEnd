import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-hotel-item',
    imports: [ButtonModule, RouterModule, CommonModule],
    templateUrl: './hotel-item.component.html',
    styleUrl: './hotel-item.component.scss',
    standalone: true
})
export class HotelItemComponent {
    @Input() hotel?: any;
}
