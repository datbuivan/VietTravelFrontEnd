import { PasswordModule } from 'primeng/password';
import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '@services/common/auth.service';
import { MessageModule } from 'primeng/message';
import { CommonModule } from '@angular/common';
import { User } from '@shared/models/user';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule, InputTextModule, ButtonModule, MessageModule, PasswordModule, ToastModule],
    providers: [MessageService]
})
export class LoginComponent {
    loginForm: FormGroup;
    loading = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private messageService: MessageService
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }
    onSubmit(): void {
        if (this.loginForm.valid) {
            this.loading = true;
            const { email, password } = this.loginForm.value;
            this.authService.login(email, password).subscribe({
                next: (user: User) => {
                    this.loading = false;
                    if (user) {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Đăng nhập thành công',
                            detail: `Chào mừng ${user.userName}!`,
                            life: 3000
                        });
                        setTimeout(() => {
                            this.authService.redirectBasedOnRole(user.roles);
                        }, 1000);
                    } else {
                        console.warn('Invalid user data:', user);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Lỗi đăng nhập',
                            detail: 'Dữ liệu người dùng không hợp lệ. Vui lòng thử lại.',
                            life: 3000
                        });
                    }
                },
                error: (error) => {
                    this.loading = false;
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Đăng nhập thất bại',
                        detail: 'Email hoặc mật khẩu không đúng. Vui lòng thử lại.',
                        life: 3000
                    });
                    console.error('Login error:', error);
                }
            });
        } else {
            this.loginForm.markAllAsTouched();
        }
    }
}
