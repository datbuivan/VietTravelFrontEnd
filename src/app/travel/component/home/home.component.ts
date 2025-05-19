import { SearchComponent } from '@travel/component/search/search.component';
import { CityService } from '@services/common/city.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { NewTourComponent } from '@travel/component/new-tour/new-tour.component';
import { HomeFavouriteComponent } from '@travel/component/home/home-favourite/home-favourite.component';
import { TabsModule } from 'primeng/tabs';
import { Region } from '@shared/models/region';
import { HomeExploreComponent } from '@travel/component/home/home-explore/home-explore.component';
import { RegionService } from '@services/common/region.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [CommonModule, ImageModule, NewTourComponent, SearchComponent, HomeFavouriteComponent, HomeExploreComponent, TabsModule]
})
export class HomeComponent implements OnInit {
    regionId: number = 0;
    regions: Region[] = [];
    @Output() regionIdChange = new EventEmitter<number>();

    constructor(
        private cityService: CityService,
        private regionService: RegionService
    ) {}

    ngOnInit(): void {
        this.getRegions();
    }
    getRegions() {
        this.regionService.getRegions().subscribe({
            next: (response) => {
                this.regions = response;
                if (this.regions.length > 0) {
                    this.regionId = this.regions[0].id;
                }
            },
            error: (error) => console.error(error)
        });
    }

    onRegionIdChange(newRegionId: string | number): void {
        this.regionId = Number(newRegionId);
    }
}
