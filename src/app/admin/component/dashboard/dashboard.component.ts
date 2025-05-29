import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DashboardService } from '@app/services/admin/dashboard.service';
import { RevenueReport } from '@app/shared/models/revenue-report';
import { VndCurrencyPipe, VndPipe } from '@app/shared/pipes/vnd.pipe';
import { SelectItem } from 'primeng/api';
import { ChartModule } from 'primeng/chart';
import { SelectModule } from 'primeng/select';
import { Table, TableModule } from 'primeng/table';
import { debounceTime } from 'rxjs';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, SelectModule, TableModule, VndCurrencyPipe, ChartModule, ReactiveFormsModule],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
    filterForm: FormGroup;
    years: SelectItem[] = [];
    revenueData!: RevenueReport;
    combinedChartData: any;
    chartOptions: any = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            tooltip: {
                callbacks: {
                    label: (context: any) => `${context.dataset.label}: ${VndPipe(context.raw)}`
                }
            }
        },
        scales: {
            x: { stacked: true },
            y: { stacked: true, beginAtZero: true }
        }
    };

    constructor(
        private fb: FormBuilder,
        private dashboardService: DashboardService
    ) {
        this.filterForm = this.fb.group({
            selectedYear: [new Date().getFullYear(), Validators.required]
        });
    }

    ngOnInit() {
        this.loadYears();
        this.filterForm.valueChanges.pipe(debounceTime(300)).subscribe(() => {
            this.loadRevenueData();
        });
        this.loadRevenueData();
    }
    loadYears() {
        this.dashboardService.getAllYears().subscribe({
            next: (years) => {
                this.years =
                    years.length > 0
                        ? years.map((year) => ({ label: year.toString(), value: year }))
                        : Array.from({ length: new Date().getFullYear() - 2019 }, (_, i) => ({
                              label: (2020 + i).toString(),
                              value: 2020 + i
                          }));
            },
            error: () => {
                this.years = Array.from({ length: new Date().getFullYear() - 2019 }, (_, i) => ({
                    label: (2020 + i).toString(),
                    value: 2020 + i
                }));
            }
        });
    }

    loadRevenueData() {
        const selectedYear = this.filterForm.get('selectedYear')?.value;
        if (!selectedYear) return;

        this.dashboardService.getRevenueReport(selectedYear).subscribe({
            next: (data) => {
                this.revenueData = data;
                this.updateCombinedChart();
            },
            error: () => {
                this.revenueData = {
                    year: selectedYear,
                    monthlyRevenues: Array.from({ length: 12 }, (_, i) => ({
                        month: i + 1,
                        tourRevenue: 0,
                        hotelRevenue: 0,
                        totalRevenue: 0
                    }))
                };
                this.updateCombinedChart();
            }
        });
    }

    updateCombinedChart() {
        this.combinedChartData = {
            type: 'bar',
            labels: this.revenueData.monthlyRevenues.map((d) => `Tháng ${d.month}`),
            datasets: [
                {
                    label: 'Doanh thu khách sạn',
                    data: this.revenueData.monthlyRevenues.map((d) => d.hotelRevenue),
                    backgroundColor: '#42A5F5',
                    borderColor: '#1E88E5',
                    borderWidth: 1
                },
                {
                    label: 'Doanh thu tour',
                    data: this.revenueData.monthlyRevenues.map((d) => d.tourRevenue),
                    backgroundColor: '#66BB6A',
                    borderColor: '#388E3C',
                    borderWidth: 1
                }
                // {
                //     label: 'Tổng doanh thu',
                //     data: this.revenueData.map((d) => d.totalRevenue),
                //     backgroundColor: '#FFA726',
                //     borderColor: '#F57C00',
                //     borderWidth: 1
                // }
            ]
        };
    }

    updateChartSize() {
        setTimeout(() => {
            const chartCanvas = document.querySelector('.p-chart canvas') as HTMLCanvasElement;
            if (chartCanvas) {
                chartCanvas.style.width = '100%';
                chartCanvas.style.height = '100%';
            } else {
                console.warn('Chart canvas not found');
            }
        }, 0);
    }

    onChartResize() {
        this.updateChartSize();
    }
}
