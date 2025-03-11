import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-hotel-item',
    imports: [ButtonModule, RouterModule],
    templateUrl: './hotel-item.component.html',
    styleUrl: './hotel-item.component.scss',
    standalone: true
})
export class HotelItemComponent {
    @Input() hotel?: any;
}
