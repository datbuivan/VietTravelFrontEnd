import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Region } from '@shared/models/region';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RegionService {
    baseUrl = environment.apiUrl;
    regions: Region[] = [];
    constructor(private http: HttpClient) {}

    getRegion(id: number): Observable<Region> {
        const city = this.regions.find((p) => p.id === id);
        if (city) {
            return of(city);
        }
        return this.http.get<{ data: Region }>(this.baseUrl + 'region/' + id).pipe(
            map((res) => {
                const region = res.data;
                this.regions.push(region);
                return region;
            })
        );
    }

    getRegions(): Observable<Region[]> {
        return this.http.get<{ data: Region[] }>(this.baseUrl + 'region').pipe(map((res) => res.data));
    }
}
