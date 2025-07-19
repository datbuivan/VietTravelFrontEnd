// export enum ReviewType {
//     Tour = 'Tour',
//     Hotel = 'Hotel'
// }

export interface Review {
    id: number;
    type: number;
    rating: number;
    comment: string;
    createdAt: string;
    tourId?: number;
    hotelId?: number;
    userId: string;
    userName: string;
}
