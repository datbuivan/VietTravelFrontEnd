import { Pipe, PipeTransform } from '@angular/core';

export const VndPipe = (value: number | null | undefined): string => {
    if (value == null) return '';
    return value.toLocaleString('vi-VN') + ' đ';
};

@Pipe({
    name: 'vnd'
})
export class VndCurrencyPipe implements PipeTransform {
    transform(value: number | null | undefined): string {
        return VndPipe(value);
    }
}
