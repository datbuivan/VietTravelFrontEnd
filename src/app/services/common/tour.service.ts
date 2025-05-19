import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Tour } from '@shared/models/tour';
import { environment } from '@environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TourService {
    baseUrl = environment.apiUrl;
    tours: Tour[] = [];
    tour!: Tour;
    constructor(private http: HttpClient) {}
    getTour(id: number): Observable<Tour> {
        const cachedTour = this.tours.find((p) => p.id === id);
        if (cachedTour) {
            return of(cachedTour);
        }
        return this.http.get<{ data: Tour }>(this.baseUrl + 'tour/' + id).pipe(
            map((res) => {
                const tour = res.data;
                this.tours.push(tour);
                return tour;
            })
        );
    }

    getTours(): Observable<Tour[]> {
        if (this.tours.length > 0) {
            return of(this.tours);
        }
        return this.http.get<{ data: Tour[] }>(this.baseUrl + 'tour').pipe(
            map((res) => {
                this.tours = res.data;
                return this.tours;
            })
        );
    }
}
