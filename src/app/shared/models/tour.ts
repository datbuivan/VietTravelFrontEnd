import { TourSchedule } from '@shared/models/tourSchedule';
import { TourStartDate } from '@shared/models/tourStartDate';
import { ImageDto } from '@shared/models/image-dto';
export interface Tour {
    id: number;
    name: string;
    price: number;
    childPrice: number;
    singleRoomSurcharge: number | null;
    cityId: number;
    tourStartDates?: TourStartDate[];
    tourSchedules?: TourSchedule[];
    images: ImageDto[];
}
