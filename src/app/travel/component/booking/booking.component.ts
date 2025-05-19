import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { ImageModule } from 'primeng/image';
import { InputNumber, InputNumberModule } from 'primeng/inputnumber';
import { InputText, InputTextModule } from 'primeng/inputtext';
import { Step, StepperModule } from 'primeng/stepper';
import { Textarea } from 'primeng/textarea';

@Component({
    selector: 'app-booking',
    standalone: true,
    imports: [ButtonModule, ImageModule, StepperModule, CommonModule, InputTextModule, InputNumberModule, ReactiveFormsModule, FloatLabel, FormsModule, Textarea],
    templateUrl: './booking.component.html',
    styleUrl: './booking.component.scss'
})
export class BookingComponent implements OnInit {
    contactForm!: FormGroup;
    activeStep: number = 1;

    constructor(private fb: FormBuilder) {}
    ngOnInit(): void {
        this.contactForm = this.fb.group({
            name: new FormControl('', Validators.required),
            email: new FormControl('', Validators.required),
            phone: new FormControl('', Validators.required),
            address: new FormControl(''),
            adult: new FormControl(1, Validators.required),
            child: new FormControl(0, Validators.required),
            note: new FormControl('')
        });
    }
}
