import { PasswordModule } from 'primeng/password';
import { ChangeDetectorRef, Component, Inject, model, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Galleria, GalleriaModule } from 'primeng/galleria';
export interface Images {
    itemImageSrc: string;
    thumbnailImageSrc: string;
    alt: string;
    title: string;
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    standalone: true,
    imports: [FormsModule, InputTextModule, ButtonModule, GalleriaModule, PasswordModule]
})
export class LoginComponent implements OnInit {
    userName: string | undefined;
    passWord: string | undefined;
    images: Images[] = [];
    showThumbnails: boolean | undefined;

    fullscreen: boolean = false;

    activeIndex: number = 0;

    onFullScreenListener: any;

    @ViewChild('galleria') galleria: Galleria | undefined;
    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private cd: ChangeDetectorRef
    ) {}
    responsiveOptions: any[] = [
        {
            breakpoint: '1300px',
            numVisible: 3
        },
        {
            breakpoint: '575px',
            numVisible: 1
        }
    ];

    ngOnInit() {
        this.images = [
            {
                itemImageSrc: 'images/uploadImage/haiphongcity.jpg',
                thumbnailImageSrc: 'images/uploadImage/haiphongcity.jpg',
                alt: 'Hải Phòng CiTy',
                title: 'Hải Phòng CiTy'
            },
            {
                itemImageSrc: 'images/uploadImage/vinhHaLong.jpg',
                thumbnailImageSrc: 'images/uploadImage/vinhHaLong.jpg',
                alt: 'Vịnh Hạ Long ',
                title: 'Vịnh Hạ Long'
            },
            {
                itemImageSrc: 'images/uploadImage/hochiminhcity.jpg',
                thumbnailImageSrc: 'images/uploadImage/hochiminhcity.jpg',
                alt: 'Thanh Hoá City',
                title: 'Thanh Hoá City'
            }
        ];
    }

    galleriaClass() {
        return `custom-galleria ${this.fullscreen ? 'fullscreen' : ''}`;
    }
}
