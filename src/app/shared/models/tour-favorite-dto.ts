export interface TourFavoriteDto {
    id: number;
    userId: string;
    tourId: number;
    name: string;
    price: number;
    imageUrl: string;
    createdAt: Date;
}
