export interface CityDto {
    id: number;
    name: string;
    titleIntroduct: string;
    contentIntroduct: string;
    regionId: number;
    pictureUrl?: string; // URL của ảnh (nếu có)
}
