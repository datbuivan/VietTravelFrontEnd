import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/services/common/auth.service';

@Component({
    selector: 'app-verify-email',
    imports: [CommonModule],
    templateUrl: './verify-email.component.html',
    styleUrl: './verify-email.component.scss'
})
export class VerifyEmailComponent implements OnInit {
    isLoading = false;
    isSuccess = false;
    errorMessage = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.isLoading = true;
        const success = this.route.snapshot.queryParamMap.get('success');
        const message = this.route.snapshot.queryParamMap.get('message');

        if (success === 'true') {
            this.isLoading = false;
            this.isSuccess = true;
        } else {
            this.isLoading = false;
            this.isSuccess = false;
            this.errorMessage = message || 'Xác nhận thất bại.';
        }
    }
    goToLogin(): void {
        this.router.navigate(['/login']);
    }

    goToRegister(): void {
        this.router.navigate(['/register']);
    }
}
