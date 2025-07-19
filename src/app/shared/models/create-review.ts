export interface ReviewCreate {
    type: number;
    rating: number;
    comment: string;
    tourId?: number;
    hotelId?: number;
}
