import { SafeUrl } from '@angular/platform-browser';

const MO = 1000000;
const MAX_SIZE = 20 * MO;

export class Picture {

    url: string;
    size: number;
    height: number;
    width: number;
    isValid: boolean;
    file: File;
    id: number;
    title: string;
    image: SafeUrl;

    constructor() { }

    postPicture = (url: string, height: number, width: number, file: File): void => {
        this.url = url;
        this.height = height;
        this.width = width;
        this.isValid = file.size < MAX_SIZE;
        this.file = file;
        this.size = file.size;
    }

    canFit(maxWidth: number, maxHeight: number): boolean {
        return this.height >= maxHeight && this.width >= maxWidth;
    }

    getPicture = (id: number, title: string, height: number, width: number, size: number, image: SafeUrl): void => {
        this.id = id;
        this.title = title;
        this.height = height;
        this.width = width;
        this.size = size;
        this.image = image;
    }
}