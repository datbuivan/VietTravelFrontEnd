import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-tour-item',
    imports: [ButtonModule, RouterModule],
    templateUrl: './tour-item.component.html',
    styleUrl: './tour-item.component.scss'
})
export class TourItemComponent {
    @Input() tour?: any;
}
