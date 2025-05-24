import { Tour } from './tour';
export interface TourFavorite {
    id?: number;
    userId?: string;
    tourId: number;
    createdAt?: Date;
    tour?: Tour;
}
