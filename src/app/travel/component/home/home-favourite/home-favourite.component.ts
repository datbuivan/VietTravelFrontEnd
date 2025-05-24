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
    template: `
        <div class="grid mx-auto w-[90%] mt-8 max-h-[600px] grid grid-cols-5 grid-rows-3 gap-4" style="grid-template-columns: 1fr 0.5fr 1fr 1fr 1fr">
            <div
                *ngFor="let city of cities; let i = index"
                class="relative rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-lg hover:brightness-50"
                [style]="'grid-column: ' + layouts[i].colStart + ' / span ' + layouts[i].colSpan + ';' + 'grid-row: ' + layouts[i].rowStart + ' / span ' + layouts[i].rowSpan + ';'"
            >
                <img [src]="city.image.url" class="w-full h-full object-cover aspect-square hover:scale-105" alt="{{ city.name }}" />
                <div class="absolute inset-0 bg-black bg-opacity-0 transition duration-300 hover:bg-opacity-50 hover:brightness-50"></div>
                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
                    <label class="block text-2xl font-bold mb-4">{{ city.name }}</label>
                    <p-button label="Khám phá" class="h-full hidden duration-300 hover:block" [raised]="true" severity="info" />
                </div>
            </div>
        </div>
    `
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
