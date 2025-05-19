import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { City } from '@app/shared/models/city';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { Select, SelectModule } from 'primeng/select';
@Component({
    selector: 'app-tour-search',
    imports: [ButtonModule, DatePickerModule, SelectModule, FormsModule],
    templateUrl: './tour-search.component.html',
    styleUrl: './tour-search.component.scss',
    standalone: true
})
export class TourSearchComponent implements OnInit {
    cities: City[] | undefined;
    selectedCity: City | undefined;
    date: Date = new Date();
    ngOnInit(): void {}
}
