import { ImageDto } from './image-dto';

export interface Hotel {
    id: number;
    name: string;
    address: string;
    price: number;
    phoneNumber: string;
    titleIntroduct: string;
    contentIntroduct: string;
    pictures: string;
    cityId: number;
    images: ImageDto[];
}
