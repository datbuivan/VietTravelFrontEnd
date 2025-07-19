import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AdminMenuitem } from '@admin/layout/admin.menuitem';

@Component({
    selector: 'app-admin-menu',
    standalone: true,
    imports: [CommonModule, AdminMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-admin-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AdminMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Trang chủ',
                items: [{ label: 'Dashboard', icon: 'pi pi-chart-bar', routerLink: ['/admin/dashboard'] }]
            },
            {
                label: 'Danh Mục Quản Lý',
                items: [
                    {
                        label: 'Thanh toán',
                        icon: 'pi pi-plus',
                        routerLink: ['/admin/payments']
                    },
                    {
                        label: 'Tour',
                        icon: 'pi pi-plus',
                        routerLink: ['/admin/tours']
                    },
                    {
                        label: 'Khách Sạn',
                        icon: 'pi pi-plus',
                        routerLink: ['/admin/hotels']
                    },
                    {
                        label: 'Người dùng',
                        icon: 'pi pi-plus',
                        routerLink: ['/admin/users']
                    },
                    {
                        label: 'Thành Phố',
                        icon: 'pi pi-plus',
                        routerLink: ['/admin/cities']
                    },
                    {
                        label: 'Phòng',
                        icon: 'pi pi-plus',
                        routerLink: ['/admin/rooms']
                    }
                ]
            }
        ];
    }
}
