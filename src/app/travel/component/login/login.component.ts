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

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule, InputTextModule, ButtonModule, MessageModule, PasswordModule],
    providers: [MessageService]
})
export class LoginComponent {
    loginForm: FormGroup;
    loading = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService
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
                        this.authService.redirectBasedOnRole(user.roles);
                    }
                },
                error: (error) => {
                    this.loading = false;
                    console.error('Login error:', error);
                }
            });
        } else {
            this.loginForm.markAllAsTouched();
        }
    }
}
