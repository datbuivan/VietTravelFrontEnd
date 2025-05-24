import { TourSchedule } from '@shared/models/tourSchedule';
import { TourService } from '@services/common/tour.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Tour } from '@shared/models/tour';
import { CommonModule } from '@angular/common';
import { VndCurrencyPipe } from '@shared/pipes/vnd.pipe';
import { TableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { TourStartDate } from '@app/shared/models/tourStartDate';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumber } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
    selector: 'app-tour-detail',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        VndCurrencyPipe,
        TableModule,
        RouterModule,
        TabsModule,
        FormsModule,
        DialogModule,
        ReactiveFormsModule,
        InputTextModule,
        TextareaModule,
        InputNumber,
        DatePickerModule,
        MessageModule,
        ToastModule,
        ConfirmDialogModule
    ],
    templateUrl: './tour-detail.component.html',
    styleUrl: './tour-detail.component.scss',
    providers: [MessageService, ConfirmationService]
})
export class TourDetailComponent implements OnInit {
    tour!: Tour;
    tourId: number = 0;
    value: number = 0;

    displayScheduleDialog: boolean = false;
    displayStartDateDialog: boolean = false;
    isEditMode: boolean = false;
    startDateForm: FormGroup;
    scheduleForm: FormGroup;
    selectedSchedule: TourSchedule | null = null;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private tourService: TourService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {
        this.scheduleForm = this.fb.group({
            title: ['', [Validators.required]],
            description: ['', Validators.required]
        });

        this.startDateForm = this.fb.group({
            availableSlots: [0, [Validators.required, Validators.min(1)]],
            startDate: [null, Validators.required]
        });
    }
    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.tourId = id ? +id : 0;
        this.fetchTour(this.tourId);
    }

    fetchTour(id: number) {
        this.tourService.getTour(id).subscribe({
            next: (res) => {
                this.tour = res;
            },
            error: (err) => {
                console.error(err);
            }
        });
    }
    openScheduleDialog(schedule?: TourSchedule): void {
        this.isEditMode = !!schedule;
        this.selectedSchedule = schedule ? { ...schedule } : null;
        if (schedule) {
            this.scheduleForm.patchValue({
                title: schedule.title,
                description: schedule.description
            });
        } else {
            this.scheduleForm.reset({ dayNumber: 0, description: '' });
        }
        this.displayScheduleDialog = true;
    }

    closeScheduleDialog(): void {
        this.displayScheduleDialog = false;
        this.displayScheduleDialog = false;
        this.scheduleForm.reset({ title: '', description: '' });
    }

    get schedules(): FormArray {
        return this.scheduleForm.get('schedules') as FormArray;
    }

    saveSchedule(): void {
        if (this.scheduleForm.valid) {
            // const schedule: TourSchedule = this.scheduleForm.value;
            const schedule = {
                ...this.scheduleForm.value,
                tourId: this.tourId
            };
            if (this.isEditMode && schedule.id) {
                // Update existing schedule
                this.tourService.editSchedule(schedule.id, schedule.title, schedule.description, this.tourId).subscribe({
                    next: () => {
                        const index = this.tour.tourSchedules!.findIndex((s) => s.id === schedule.id);
                        if (index !== -1) {
                            this.tour.tourSchedules![index] = { ...schedule };
                        }
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Thành công',
                            detail: 'Cập nhật ngày lịch trình thành công'
                        });
                        this.closeScheduleDialog();
                    },
                    error: (err) => {
                        console.error('Error updating schedule:', err);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Lỗi',
                            detail: 'Cập nhật lịch trình thất bại: '
                        });
                    }
                });
            } else {
                // Add new schedule
                this.tourService.addSchedule(schedule.title, schedule.description, this.tourId).subscribe({
                    next: (response) => {
                        if (!this.tour.tourSchedules) {
                            this.tour.tourSchedules = [];
                        }
                        if (response.data) {
                            this.tour.tourSchedules.push(response.data);
                        }
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Thành công',
                            detail: 'Thêm lịch trình thành công'
                        });
                        this.closeScheduleDialog();
                    },
                    error: (err) => {
                        console.error('Error creating schedule:', err);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Lỗi',
                            detail: 'Thêm lịch trình thất bại: '
                        });
                    }
                });
            }
        }
    }

    editSchedule(id: number): void {
        this.tourService.getScheduleById(id).subscribe({
            next: (schedule) => {
                this.openScheduleDialog(schedule);
            },
            error: (err) => {
                console.error('Error fetching schedule:', err);
            }
        });
    }

    deleteSchedule(id: number) {
        this.confirmationService.confirm({
            message: 'Bạn có chắc chắn muốn xóa lịch trình này?',
            header: 'Xác nhận xóa',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Xóa',
            rejectLabel: 'Hủy',
            accept: () => {
                this.tourService.deleteSchedule(id).subscribe({
                    next: () => {
                        if (this.tour.tourSchedules) {
                            this.tour.tourSchedules = this.tour.tourSchedules.filter((s) => s.id !== id);
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Thành công',
                                detail: 'Xóa lịch trình thành công'
                            });
                        }
                    },
                    error: (err) => {
                        console.error('Error deleting schedule:', err);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Lỗi',
                            detail: 'Xoá lịch trình thất bại: '
                        });
                    }
                });
            },
            reject: () => {
                this.messageService.add({
                    severity: 'info',
                    summary: 'Hủy',
                    detail: 'Đã hủy xóa lịch trình'
                });
            }
        });
    }

    openStartDateDialog(startDate?: TourStartDate): void {
        this.isEditMode = !!startDate;
        if (startDate) {
            this.startDateForm.patchValue({
                id: startDate.id,
                startDate: new Date(startDate.startDate)
            });
        } else {
            this.startDateForm.reset({ id: null, startDate: '' });
        }
        this.displayStartDateDialog = true;
    }

    closeStartDateDialog(): void {
        this.displayStartDateDialog = false;
        this.startDateForm.reset({ availableSlots: 0, startDate: '' });
    }

    saveStartDate(): void {
        if (this.startDateForm.valid) {
            const formValue = this.startDateForm.value;
            const startDate = {
                id: formValue.id,
                availableSlots: formValue.availableSlots,
                startDate: formValue.startDate.toISOString().split('T')[0],
                tourId: this.tourId
            };
            if (this.isEditMode && startDate.id) {
                this.tourService.editStartDate(startDate.id, startDate.availableSlots, startDate.startDate, startDate.tourId).subscribe({
                    next: () => {
                        const index = this.tour.tourStartDates!.findIndex((s) => s.id === startDate.id);
                        if (index !== -1) {
                            this.tour.tourStartDates![index] = { ...startDate };
                        }
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Thành công',
                            detail: 'Cập nhật ngày khởi hành thành công'
                        });
                        this.closeStartDateDialog();
                    },
                    error: (err) => {
                        console.error('Error updating start date:', err);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Lỗi',
                            detail: 'Cập nhật ngày khởi hành thất bại: '
                        });
                    }
                });
            } else {
                this.tourService.addStartDate(startDate.availableSlots, startDate.startDate, startDate.tourId).subscribe({
                    next: (response) => {
                        if (!this.tour.tourStartDates) {
                            this.tour.tourStartDates = [];
                        }
                        if (response.data) {
                            this.tour.tourStartDates.push(response.data);
                        }
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Thành công',
                            detail: 'Thêm ngày khởi hành thành công'
                        });
                        this.closeStartDateDialog();
                    },
                    error: (err) => {
                        console.error('Error adding start date:', err);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Lỗi',
                            detail: 'Thêm ngày khởi hành thất bại: '
                        });
                    }
                });
            }
        }
    }
    editStartDate(id?: number): void {
        if (id) {
            const startDate = this.tour.tourStartDates?.find((s) => s.id === id);
            if (startDate) {
                this.openStartDateDialog(startDate);
            } else {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Lỗi',
                    detail: 'Không tìm thấy ngày khởi hành để sửa'
                });
            }
        }
    }
    deleteStartDate(id?: number): void {
        if (id) {
            this.confirmationService.confirm({
                message: 'Bạn có chắc chắn muốn xóa lịch trình này?',
                header: 'Xác nhận xóa',
                icon: 'pi pi-exclamation-triangle',
                acceptLabel: 'Xóa',
                rejectLabel: 'Hủy',
                accept: () => {
                    this.tourService.deleteStartDate(id).subscribe({
                        next: () => {
                            this.tour.tourStartDates = this.tour.tourStartDates?.filter((s) => s.id !== id);
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Thành công',
                                detail: 'Xóa ngày khởi hành thành công'
                            });
                        },
                        error: (error) => {
                            console.log('Error deleting start date:', error);
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Lỗi',
                                detail: 'Xóa ngày khởi hành thất bại: '
                            });
                        }
                    });
                },
                reject: () => {
                    this.messageService.add({
                        severity: 'info',
                        summary: 'Hủy',
                        detail: 'Đã hủy xóa ngày khởi hành'
                    });
                }
            });
        }
    }
}
