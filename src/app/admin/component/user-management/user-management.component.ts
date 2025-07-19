import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '@app/services/admin/user.service';
import { Role } from '@app/shared/models/role';
import { User } from '@app/shared/models/user';
import { UserDto } from '@app/shared/models/user-dto';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { Table, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-user-management',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, ToastModule, DialogModule, SelectModule, ChipModule, TableModule, IconFieldModule, InputIconModule, InputTextModule, RouterModule],
    templateUrl: './user-management.component.html',
    styleUrl: './user-management.component.scss',
    providers: [MessageService]
})
export class UserManagementComponent {
    @ViewChild('dt') dt: Table | undefined;
    users: UserDto[] = [];
    roles: Role[] = [];
    selectedUser: UserDto | null = null;
    displayRoleDialog: boolean = false;
    selectedRole: string | null = null;

    constructor(
        private userService: UserService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.loadUsers();
        this.loadRoles();
    }

    loadUsers(): void {
        this.userService.getUsers().subscribe({
            next: (users) => (this.users = users),
            error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load users' })
        });
    }

    loadRoles(): void {
        this.userService.getRoles().subscribe({
            next: (roles) => (this.roles = roles),
            error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load roles' })
        });
    }

    onGlobalFilter(table: Table, event: Event): void {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    deleteUser(id: string): void {
        if (confirm('Are you sure you want to delete this user?')) {
            this.userService.deleteUser(id).subscribe({
                next: () => {
                    this.users = this.users.filter((user) => user.id !== id);
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User deleted successfully' });
                },
                error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete user' })
            });
        }
    }

    openRoleDialog(user: UserDto): void {
        this.selectedUser = user;
        this.displayRoleDialog = true;
    }

    assignRole(): void {
        if (this.selectedUser && this.selectedRole) {
            this.userService.assignRole(this.selectedUser.id, this.selectedRole).subscribe({
                next: () => {
                    if (this.selectedUser) {
                        this.selectedUser.roles.push(this.selectedRole!);
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Role ${this.selectedRole} assigned` });
                        this.displayRoleDialog = false;
                        this.selectedRole = null;
                    }
                },
                error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: `Failed to assign role ${this.selectedRole}` })
            });
        }
    }

    removeRole(user: UserDto, role: string): void {
        if (confirm(`Are you sure you want to remove role ${role} from this user?`)) {
            this.userService.removeRole(user.id, role).subscribe({
                next: () => {
                    user.roles = user.roles.filter((r) => r !== role);
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: `Role ${role} removed` });
                },
                error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: `Failed to remove role ${role}` })
            });
        }
    }
}
