export interface HotelSpecParams {
    cityId?: number;
    sort?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    startDate?: Date | string;
}
