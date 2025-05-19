import { Region } from '@app/shared/models/region';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CityService } from '@app/services/common/city.service';
import { City } from '@app/shared/models/city';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { RegionService } from '@app/services/common/region.service';

@Component({
    selector: 'app-city-detail',
    imports: [CommonModule, ButtonModule, RouterModule],
    templateUrl: './city-detail.component.html',
    styleUrl: './city-detail.component.scss'
})
export class CityDetailComponent implements OnInit {
    cityId?: number;
    city: City | null = null;

    region: Region | null = null;

    constructor(
        private route: ActivatedRoute,
        private cityService: CityService,
        private regionService: RegionService
    ) {}

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.cityId = id ? +id : 0;
        if (this.cityId) {
            this.getCity(Number(this.cityId));
        }
    }

    getCity(id: number): void {
        this.cityService.getCity(id).subscribe({
            next: (res) => {
                this.city = res;
            },
            error: (err) => {
                console.error('Error fetching city details:', err);
            }
        });
    }

    getRegionName(regionId: number): string {
        const region = this.regionService.regions.find((r) => r.id === regionId);
        return region ? region.name : 'Không xác định';
    }
}
