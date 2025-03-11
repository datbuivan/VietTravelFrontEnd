import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { SearchComponent } from '../search/search.component';
import { NewTourComponent } from '../new-tour/new-tour.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [CommonModule, ImageModule, NewTourComponent, SearchComponent]
})
export class HomeComponent implements OnInit {
    ngOnInit(): void {}
}
