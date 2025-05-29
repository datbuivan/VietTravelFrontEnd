import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ButtonModule } from 'primeng/button';
import { Menu, MenuModule } from 'primeng/menu';
import { AuthService } from '@app/services/common/auth.service';

@Component({
    selector: 'app-topbar',
    styleUrls: ['./app.topbar.scss'],
    standalone: true,
    imports: [RouterModule, CommonModule, SplitButtonModule, ButtonModule, MenuModule],
    template: `
        <div class="topbar">
            <div class="topbar-content">
                <div class="logo">
                    <img src="images/icon/logo.png" alt="Logo" style="height: 40px;" />
                    <span style="font-family: 'Pacifico', cursive; font-size: 1.2rem; font-weight: 600">Viet Travel</span>
                </div>

                <button type="button" (click)="toggleUserMenu($event)" class="menu-toggle lg:hidden">
                    <i class="pi pi-bars"></i>
                </button>

                <!-- Thay p-menu bằng nav cho navItems -->
                <nav class="nav-items lg:flex hidden" *ngIf="!isLoggedIn || isLoggedIn">
                    <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" class="nav-link">Trang chủ</a>
                    <a routerLink="/tours" routerLinkActive="active" class="nav-link">Chuyến đi</a>
                    <a routerLink="/hotels" routerLinkActive="active" class="nav-link">Khách sạn</a>
                    <a routerLink="/history" routerLinkActive="active" class="nav-link">Lịch sử</a>
                </nav>
                <div *ngIf="!isLoggedIn" class="auth-buttons">
                    <p-button label="Đăng nhập" styleClass="p-button-outlined mr-2" routerLink="/login"></p-button>
                    <p-button label="Đăng ký" styleClass="p-button-success" routerLink="/register"></p-button>
                </div>
                <div *ngIf="isLoggedIn" class="p-4">
                    <button type="button">
                        <i class="pi pi-heart font-bold" routerLink="/tour-favorite"></i>
                    </button>
                </div>
                <div *ngIf="isLoggedIn" class="auth-buttons gap-4">
                    <button type="button" class="layout-topbar-action" (click)="toggleUserMenu($event)">
                        <i class="pi pi-user font-bold"></i>
                        <span class="pl-2 user-name">{{ userName }}</span>
                    </button>
                    <p-menu #userMenu [model]="userItems" [popup]="true"></p-menu>
                </div>
            </div>
        </div>
    `
})
export class AppTopbar implements OnInit {
    @ViewChild('userMenu') userMenu!: Menu;
    isLoggedIn: boolean = false;
    userName: string | undefined;
    navItems: MenuItem[] = [];
    userItems: MenuItem[] = [];

    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    ngOnInit() {
        const token = localStorage.getItem('currentUser');
        this.isLoggedIn = !!token;
        this.userName = this.authService.currentUserValue?.userName;
        this.userItems = [
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
        this.navItems = [
            { label: 'Trang chủ', command: () => this.router.navigate(['/']) },
            { label: 'Chuyến đi', command: () => this.router.navigate(['/tour']) },
            { label: 'Khách sạn', command: () => this.router.navigate(['/hotel']) },
            { label: 'Lịch sử', command: () => this.router.navigate(['/history']) }
        ];
    }

    logout(): void {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentUser');
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
    }

    navigateToProfile(): void {
        this.router.navigate(['/profile']);
    }

    toggleUserMenu(event: Event) {
        if (this.userMenu) {
            this.userMenu.toggle(event);
        } else {
            console.error('User menu reference is undefined');
        }
    }
}
