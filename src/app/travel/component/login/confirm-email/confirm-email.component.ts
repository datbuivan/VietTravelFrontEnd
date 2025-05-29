import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-confirm-email',
    standalone: true,
    imports: [ButtonModule],
    templateUrl: './confirm-email.component.html',
    styleUrl: './confirm-email.component.scss'
})
export class ConfirmEmailComponent {
    email: string;

    constructor(private router: Router) {
        this.email = history.state.email || 'email của bạn';
    }
}
