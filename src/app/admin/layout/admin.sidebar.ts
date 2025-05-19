import { Component, ElementRef } from '@angular/core';
import { AdminMenu } from '@admin/layout/admin.menu';

@Component({
    selector: 'app-admin-sidebar',
    standalone: true,
    imports: [AdminMenu],
    template: ` <div class="layout-sidebar">
        <app-admin-menu></app-admin-menu>
    </div>`
})
export class AdminSidebar {
    constructor(public el: ElementRef) {}
}
