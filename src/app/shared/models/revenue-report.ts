import { MonthlyRevenue } from '@shared/models/monthly-revenue';

export interface RevenueReport {
    year: number;
    monthlyRevenues: MonthlyRevenue[];
}
