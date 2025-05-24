import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AdminConfigurator } from '@admin/layout/admin.configurator';
import { LayoutAdminService } from '@services/layout/layoutAdmin.service';
import { AuthService } from '@app/services/common/auth.service';
import { Menu } from 'primeng/menu';

@Component({
    selector: 'app-admin-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, AdminConfigurator, Menu],
    template: ` <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()">
                <i class="pi pi-bars"></i>
            </button>
            <a class="layout-topbar-logo" routerLink="/">
                <img src="images/icon/logo.png" alt="Logo" style="height: 40px;" />
                <span style="font-family: 'Pacifico', cursive; font-size: 1.2rem; font-weight: 600">Viet Travel</span>
            </a>
        </div>

        <div class="layout-topbar-actions">
            <div class="layout-config-menu">
                <button type="button" class="layout-topbar-action" (click)="toggleDarkMode()">
                    <i [ngClass]="{ 'pi ': true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme() }"></i>
                </button>
                <div class="relative">
                    <button
                        class="layout-topbar-action layout-topbar-action-highlight"
                        pStyleClass="@next"
                        enterFromClass="hidden"
                        enterActiveClass="animate-scalein"
                        leaveToClass="hidden"
                        leaveActiveClass="animate-fadeout"
                        [hideOnOutsideClick]="true"
                    >
                        <i class="pi pi-palette"></i>
                    </button>
                    <app-admin-configurator />
                </div>
            </div>

            <button class="layout-topbar-menu-button layout-topbar-action" pStyleClass="@next" enterFromClass="hidden" enterActiveClass="animate-scalein" leaveToClass="hidden" leaveActiveClass="animate-fadeout" [hideOnOutsideClick]="true">
                <i class="pi pi-ellipsis-v"></i>
            </button>

            <div class="layout-topbar-menu hidden lg:block">
                <div class="layout-topbar-menu-content">
                    <button type="button" class="layout-topbar-action">
                        <i class="pi pi-calendar"></i>
                        <span>Calendar</span>
                    </button>
                    <button type="button" class="layout-topbar-action">
                        <i class="pi pi-inbox"></i>
                        <span>Messages</span>
                    </button>
                    <button type="button" class="layout-topbar-action" (click)="menu.toggle($event)">
                        <i class="pi pi-user"></i>
                        <span>{{ userName }}</span>
                    </button>
                    <p-menu #menu [model]="menuItems" [popup]="true"></p-menu>
                </div>
            </div>
        </div>
    </div>`
})
export class AdminTopbar implements OnInit {
    menuItems: MenuItem[] = [];
    userName: string | undefined;

    constructor(
        public layoutService: LayoutAdminService,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.userName = this.authService.currentUserValue?.userName;
        this.menuItems = [
            {
                label: 'Profile',
                icon: 'pi pi-user',
                command: () => this.navigateToProfile()
            },
            {
                label: 'Logout',
                icon: 'pi pi-sign-out',
                command: () => this.logout()
            }
        ];
    }

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }

    navigateToProfile(): void {
        this.router.navigate(['/profile']);
    }

    logout(): void {
        this.authService.logout();
    }
}
