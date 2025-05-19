import { ImageDto } from '@shared/models/image-dto';

export interface City {
    id: number;
    name: string;
    titleIntroduct: string;
    contentIntroduct: string;
    regionId: number;
    image: ImageDto;
}
