import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RevenueReport } from '@app/shared/models/revenue-report';
import { environment } from '@environments/environment';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    baseUrl = environment.apiUrl;
    constructor(private http: HttpClient) {}

    getAllYears(): Observable<number[]> {
        return this.http.get<{ data: RevenueReport[] }>(this.baseUrl + 'Revenue/all-revenue').pipe(
            map((res) =>
                res.data
                    .map((d) => d.year)
                    .filter((year, index, self) => self.indexOf(year) === index)
                    .sort()
            ),
            catchError((error) => {
                console.error('Error fetching years:', error);
                return of([]);
            })
        );
    }

    getAllRevenueReports(): Observable<RevenueReport[]> {
        return this.http.get<{ data: RevenueReport[] }>(this.baseUrl + 'all-revenue').pipe(
            map((res) => {
                const reports = res.data;
                return (
                    reports ??
                    Array.from({ length: 12 }, (_, i) => ({
                        year: new Date().getFullYear(),
                        monthlyRevenues: Array.from({ length: 12 }, (_, j) => ({
                            month: j + 1,
                            tourRevenue: 0,
                            hotelRevenue: 0,
                            totalRevenue: 0
                        }))
                    }))
                );
            }),
            catchError((error) => {
                console.error('Error fetching all revenue reports:', error);
                return of([]);
            })
        );
    }

    getRevenueReport(year: number): Observable<RevenueReport> {
        return this.http.get<{ data: RevenueReport }>(`${this.baseUrl}Revenue/revenue-report/${year}`).pipe(
            map((res) => {
                const yearData = res.data;
                return (
                    yearData ?? {
                        year,
                        monthlyRevenues: Array.from({ length: 12 }, (_, i) => ({
                            month: i + 1,
                            tourRevenue: 0,
                            hotelRevenue: 0,
                            totalRevenue: 0
                        }))
                    }
                );
            }),
            catchError((error) => {
                console.error(`Error fetching revenue data for year ${year}:`, error);
                return of({
                    year,
                    monthlyRevenues: Array.from({ length: 12 }, (_, i) => ({
                        month: i + 1,
                        tourRevenue: 0,
                        hotelRevenue: 0,
                        totalRevenue: 0
                    }))
                });
            })
        );
    }
}
