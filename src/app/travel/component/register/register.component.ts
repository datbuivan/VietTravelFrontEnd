import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule, CardModule, InputTextModule, PasswordModule, ButtonModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
    registerForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.registerForm = this.fb.group(
            {
                username: ['', [Validators.required]],
                email: ['', [Validators.required, Validators.email]],
                phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
                address: ['', [Validators.required]],
                password: ['', [Validators.required, Validators.minLength(6)]],
                confirmPassword: ['', [Validators.required]]
            },
            { validators: this.passwordMatchValidator }
        );
    }

    passwordMatchValidator(formGroup: FormGroup) {
        const password = formGroup.get('password')?.value;
        const confirmPassword = formGroup.get('confirmPassword')?.value;
        return password === confirmPassword ? null : { mismatch: true };
    }

    onSubmit(): void {
        if (this.registerForm.valid) {
            const formData = this.registerForm.value;
            this.http.post('http://localhost:5000/api/auth/register', formData).subscribe({
                next: (response) => {
                    console.log('Registration successful', response);
                    this.router.navigate(['/login']);
                },
                error: (error) => {
                    console.error('Registration failed', error);
                }
            });
        }
    }
}
