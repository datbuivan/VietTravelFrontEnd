import { Component } from '@angular/core';
import { ImageModule } from 'primeng/image';

@Component({
    selector: 'app-home-explore',
    standalone: true,
    imports: [ImageModule],
    templateUrl: './home-explore.component.html',
    styleUrl: './home-explore.component.scss'
})
export class HomeExploreComponent {}
