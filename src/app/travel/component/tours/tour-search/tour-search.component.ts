import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { Select, SelectModule } from 'primeng/select';
interface City {
    name: string;
    code: string;
}
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
    ngOnInit(): void {
        this.cities = [
            { name: 'Hà Nội', code: 'HN' },
            { name: 'Hải Phòng', code: 'HP' },
            { name: 'Quảng Ninh', code: 'QN' },
            { name: 'Phú Quốc', code: 'PQ' },
            { name: 'Nha Trang', code: 'NT' }
        ];
    }
}
