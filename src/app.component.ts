import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, CommonModule, NgxSpinnerModule],
    template: `<ngx-spinner type="ball-scale-ripple">
            <p class="text-white">loading...</p>
        </ngx-spinner>
        <router-outlet></router-outlet> `
})
export class AppComponent {}
