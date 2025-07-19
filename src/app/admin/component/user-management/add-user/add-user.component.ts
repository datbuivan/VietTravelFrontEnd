import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '@app/services/admin/user.service';
import { CreateUserDto } from '@app/shared/models/create-user-dto';
import { Role } from '@app/shared/models/role';
import { UserDto } from '@app/shared/models/user-dto';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { forkJoin, of, switchMap } from 'rxjs';

@Component({
    selector: 'app-add-user',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ButtonModule, RouterModule, InputTextModule],
    templateUrl: './add-user.component.html',
    styleUrl: './add-user.component.scss'
})
export class AddUserComponent implements OnInit {
    userForm: FormGroup;
    isEditMode = false;
    userId: string | null = null;
    availableRoles: Role[] = [];
    selectedRoles: string[] = [];
    currentRoles: string[] = [];
    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService
    ) {
        this.userForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            userName: ['', [Validators.required, Validators.minLength(3)]],
            phoneNumber: ['', [Validators.pattern('^[0-9]{10,11}$')]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            roles: [[]]
        });
    }

    ngOnInit(): void {
        this.userId = this.route.snapshot.params['id'];
        this.isEditMode = !!this.userId;

        if (this.isEditMode) {
            this.userForm.get('password')?.clearValidators();
            this.userForm.get('password')?.updateValueAndValidity();
        }

        this.userService.getRoles().subscribe((roles) => {
            this.availableRoles = roles;
        });

        if (this.isEditMode) {
            this.loadUserData(this.userId!);
        }
    }

    loadUserData(id: string): void {
        this.userService.getUser(id).subscribe((user) => {
            this.userForm.patchValue({
                email: user.email,
                userName: user.userName,
                phoneNumber: user.phoneNumber,
                roles: user.roles
            });
            this.selectedRoles = user.roles;
            this.currentRoles = [...user.roles]; // Lưu vai trò hiện tại
        });
    }

    onSubmit(): void {
        if (this.userForm.invalid) {
            this.userForm.markAllAsTouched();
            return;
        }

        const userData = this.userForm.value;
        if (this.isEditMode) {
            const updateData: UserDto = {
                id: this.userId!,
                email: userData.email,
                userName: userData.userName,
                phoneNumber: userData.phoneNumber,
                roles: this.selectedRoles
            };
            const rolesToRemove = this.currentRoles.filter((role) => !this.selectedRoles.includes(role));
            const rolesToAdd = this.selectedRoles.filter((role) => !this.currentRoles.includes(role));
            this.userService
                .updateUser(this.userId!, updateData)
                .pipe(
                    switchMap(() => {
                        const removeRoleObservables = rolesToRemove.map((role) => this.userService.removeRole(this.userId!, role));
                        return forkJoin(removeRoleObservables);
                    }),
                    switchMap(() => {
                        const addRoleObservables = rolesToAdd.map((role) => this.userService.assignRole(this.userId!, role));
                        return forkJoin(addRoleObservables);
                    })
                )
                .subscribe({
                    next: () => this.router.navigate(['/admin/users']),
                    error: (err) => alert('Cập nhật thất bại: ' + err.message)
                });
        } else {
            const createData: CreateUserDto = {
                email: userData.email,
                userName: userData.userName,
                phoneNumber: userData.phoneNumber,
                password: userData.password
            };
            this.userService
                .createUser(createData)
                .pipe(
                    switchMap((user: UserDto) => {
                        const roleAssignments = this.selectedRoles.map((role) => this.userService.assignRole(user.id, role));
                        return forkJoin(roleAssignments);
                    })
                )
                .subscribe({
                    next: () => this.router.navigate(['/admin/users']),
                    error: (err) => alert('Tạo người dùng thất bại: ' + err.message)
                });
        }
    }

    onCancel(): void {
        this.router.navigate(['/admin/users']);
    }
}
