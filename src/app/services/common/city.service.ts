import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from '@environments/environment';
import { City } from '@shared/models/city';
import { Region } from '@shared/models/region';
import { ApiResponse } from '@shared/models/api-response';
import { CityDto } from '@shared/models/city-dto';

@Injectable({
    providedIn: 'root'
})
export class CityService {
    baseUrl = environment.apiUrl;
    cities: City[] = [];
    regions: Region[] = [];
    constructor(private http: HttpClient) {}

    getCities(): Observable<City[]> {
        if (this.cities.length > 0) {
            return of(this.cities);
        }
        return this.http.get<{ data: City[] }>(this.baseUrl + 'city').pipe(
            map((res) => {
                this.cities = res.data;
                return this.cities;
            })
        );
    }

    addCity(formData: FormData): Observable<ApiResponse<CityDto>> {
        return this.http.post<ApiResponse<CityDto>>(this.baseUrl + 'city', formData);
    }

    updateCity(id: number, formData: FormData): Observable<ApiResponse<CityDto>> {
        return this.http.put<ApiResponse<CityDto>>(this.baseUrl + 'city/' + id, formData);
    }

    getCity(id: number): Observable<City> {
        const city = this.cities.find((p) => p.id === id);
        if (city) {
            return of(city);
        }
        return this.http.get<{ data: City }>(this.baseUrl + 'city/' + id).pipe(
            map((res) => {
                const city = res.data;
                this.cities.push(city);
                return city;
            })
        );
    }
    getCitiesByRegion(regionId: number): Observable<City[]> {
        return this.http.get<{ data: City[] }>(this.baseUrl + 'City/byRegion/' + regionId).pipe(map((res) => res.data));
    }
}
