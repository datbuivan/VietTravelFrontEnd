import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@app/services/common/auth.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule, CardModule, InputTextModule, PasswordModule, ButtonModule, ToastModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
    providers: [MessageService]
})
export class RegisterComponent implements OnInit {
    registerForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private messageService: MessageService
    ) {
        this.registerForm = this.fb.group(
            {
                username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
                email: ['', [Validators.required, Validators.email]],
                phoneNumber: ['', [Validators.required, Validators.pattern(/^(?:\+84|0)(?:\d{9})$/)]],
                address: ['', Validators.required],
                password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]],
                confirmPassword: ['', Validators.required]
            },
            { validators: this.passwordMatchValidator }
        );
    }

    ngOnInit(): void {}

    passwordMatchValidator(formGroup: FormGroup) {
        const password = formGroup.get('password')?.value;
        const confirmPassword = formGroup.get('confirmPassword')?.value;
        return password === confirmPassword ? null : { mismatch: true };
    }

    onSubmit(): void {
        if (this.registerForm.valid) {
            const formData = this.registerForm.value;
            this.authService.register(formData.username, formData.email, formData.phoneNumber, formData.address, formData.password).subscribe({
                next: (response) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Thành công',
                        detail: 'Đăng ký thành công! Vui lòng đăng nhập.',
                        life: 3000
                    });
                    if (response.message === 'Registration successful, please confirm your email') {
                        this.router.navigate(['/confirm-email'], { state: { email: formData.email } });
                    } else {
                        this.router.navigate(['/login']);
                    }
                },
                error: (error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Lỗi',
                        detail: error.message || 'Đăng ký thất bại. Vui lòng thử lại.',
                        life: 3000
                    });
                }
            });
        }
    }
}
