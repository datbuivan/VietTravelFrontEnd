import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { delay, finalize } from 'rxjs';
import { BusyService } from '@core/busy.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
    const busyService = inject(BusyService);
    busyService.busy();
    return next(req).pipe(
        delay(50),
        finalize(() => busyService.idle())
    );
};
