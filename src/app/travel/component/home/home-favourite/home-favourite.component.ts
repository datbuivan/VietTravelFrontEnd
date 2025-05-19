import { CityService } from '@services/common/city.service';
import { TabViewModule } from 'primeng/tabview';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { City } from '@shared/models/city';

@Component({
    selector: 'app-home-favourite',
    standalone: true,
    imports: [CommonModule, CardModule, ButtonModule, TabViewModule],
    templateUrl: './home-favourite.component.html',
    styleUrl: './home-favourite.component.scss'
})
export class HomeFavouriteComponent implements OnInit, OnChanges {
    cities: City[] = [];
    @Input() regionId: number = 0;
    layouts = [
        { colStart: 1, rowStart: 1, colSpan: 2, rowSpan: 2 },
        { colStart: 3, rowStart: 1, colSpan: 1, rowSpan: 1 },
        { colStart: 4, rowStart: 1, colSpan: 2, rowSpan: 1 },
        { colStart: 3, rowStart: 2, colSpan: 1, rowSpan: 1 },
        { colStart: 4, rowStart: 2, colSpan: 1, rowSpan: 1 },
        { colStart: 5, rowStart: 2, colSpan: 1, rowSpan: 2 },
        { colStart: 1, rowStart: 3, colSpan: 1, rowSpan: 1 },
        { colStart: 2, rowStart: 3, colSpan: 2, rowSpan: 1 },
        { colStart: 4, rowStart: 3, colSpan: 1, rowSpan: 1 }
    ];
    activeRegionIndex = 0;
    constructor(private CityService: CityService) {}
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['regionId']) {
            const currentRegionId = changes['regionId'].currentValue;
            this.getCitiesByRegion(currentRegionId);
        }
    }
    ngOnInit(): void {
        this.getCitiesByRegion(this.regionId);
    }

    getCitiesByRegion(regionId: number) {
        this.CityService.getCitiesByRegion(regionId).subscribe({
            next: (response) => (this.cities = response.slice(0, 9)),
            error: (error) => console.error(error)
        });
    }
}
