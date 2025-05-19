import { TourSchedule } from '@shared/models/tourSchedule';
import { TourStartDate } from '@shared/models/tourStartDate';
export interface Tour {
    id: number;
    name: string;
    price: number;
    childPrice: number;
    singleRoomSurcharge: number | null;
    cityId: number;
    tourStartDates: TourStartDate[];
    tourSchedules: TourSchedule[];
    images: string[];
}
