import { CatalogModel, TextStyle } from './generate/catalog-model';
import { Page } from './page';
import { Picture } from '../pictures/picture';
import { CustomInfo } from './custom-info';


export class Catalog {
    pageNumber = 0;
    catalogModel: CatalogModel;
    pages: Page[] = [];
    pictures: Picture[];
    coverPictures: Picture[];
    customInfo: CustomInfo;

    constructor(pictures: Picture[], catalogModel: CatalogModel) {
        if (pictures == null || catalogModel == null) {
            throw new Error("At least one of the params is null");
        }
        this.pictures = pictures;
        this.catalogModel = catalogModel;
        this.calculatePageNumber();
        this.generatePages();
    }

    private calculatePageNumber() : void {
        let count = this.pictures.length;
        while (count > 0) {
            for (let i = 0; i < this.catalogModel.IMG_MAX_PER_PAGE_TYPE.length && count > 0; i++) {
                count -= this.catalogModel.IMG_MAX_PER_PAGE_TYPE[i];
                this.pageNumber++;
            } 
        }
        // add front cover and back cover
        this.pageNumber += 2;
    }

    private generatePages() : void {
        for (let i = 1; i <= this.pageNumber; i++) {
            this.pages.push(new Page(i, this.catalogModel.pageWidth, this.catalogModel.pageHeight));
        }
    }

    public drawPages(coverPictures: Picture[], customInfo: CustomInfo) {
        for (let page of this.pages) {
            page.drawPage();
        }
        this.coverPictures = coverPictures;
        this.customInfo = customInfo;
        this.insertCoverPictures();
        this.insertTitle();
        this.insertDescription();
        this.insertCoverDecorations();
        this.insertMonth();
        this.insertAuthor();
        this.insertEnterpriseName();
        this.insertTotalPageNumber();
        this.insertImagesAndDescriptionsToFitModel();
        this.insertPageNumber();
        this.insertSummary();
        this.insertBackCoverDecorations();
        this.insertBackCoverTextDecorations();
        this.insertTel();
        this.insertMail();
        this.insertTuringGallerySignature();
        this.insertInfoBack();
    }

    private insertCoverPictures() {
        const sizeFrontCover = this.resizeCoverImageCorrectly(this.coverPictures[0], this.catalogModel.pageWidth, this.catalogModel.pageHeight);
        const sizeBackCover = this.resizeCoverImageCorrectly(this.coverPictures[1], this.catalogModel.pageWidth, this.catalogModel.pageHeight);
        this.pages[0].addImage(this.coverPictures[0].url, 0, 0, sizeFrontCover.width, sizeFrontCover.height, 0.9);
        this.pages[this.pages.length-1].addImage(this.coverPictures[1].url, 0, 0, sizeBackCover.width, sizeBackCover.height, 0.9);
    }

    private insertTitle() {
        this.pages[0].addText(this.customInfo.title, this.catalogModel.title.x, this.catalogModel.title.y, this.catalogModel.titleStyle);
    }

    private insertDescription() {
        this.pages[0].addText(
            this.customInfo.description, 
            this.catalogModel.catalogDescription.x, 
            this.catalogModel.catalogDescription.y, 
            this.catalogModel.catalogDescriptionStyle
        );
    }

    private insertCoverDecorations() { 
        for (let decoration of this.catalogModel.coverDecorations) {
            this.pages[0].addDecoration(decoration);
        }
    }

    private insertMonth() {
        this.pages[0].addText(
            `EDITION ${this.customInfo.month.toUpperCase()}`,
            this.catalogModel.month.position.x,
            this.catalogModel.month.position.y,
            this.catalogModel.month.style,
        );
    }

    private insertAuthor() {
        this.pages[0].addText(
            this.customInfo.author,
            this.catalogModel.author.position.x,
            this.catalogModel.author.position.y,
            this.catalogModel.author.style,
        );
    }

    private insertEnterpriseName() {
        this.pages[0].addText(
            `${this.customInfo.enterprise} - ${this.customInfo.year}`,
            this.catalogModel.enterprise.position.x,
            this.catalogModel.enterprise.position.y,
            this.catalogModel.enterprise.style,
        );
    }

    private insertTotalPageNumber() {
        this.pages[0].addText(
            `${this.pages.length - 2} pages`,
            this.catalogModel.totalPageNumber.position.x,
            this.catalogModel.totalPageNumber.position.y,
            this.catalogModel.totalPageNumber.style,
        );
    }

    private insertImagesAndDescriptionsToFitModel() {
        let pictureCount = 0;
        let i = 1;
        for (let i = 1; i < this.pageNumber - 1;) {
            let j = 0;
            for (let imageModelCount of this.catalogModel.IMG_MAX_PER_PAGE_TYPE) {
                for (let k = 0; k < imageModelCount && pictureCount < this.pictures.length; k++) {
                    const size = this.resizeImageCorrectly(
                        this.pictures[pictureCount], 
                        this.catalogModel.images[j][k].maxWidth, 
                        this.catalogModel.images[j][k].maxHeight
                    );
                    this.pages[i].addImage(
                        this.pictures[pictureCount].url, 
                        this.catalogModel.images[j][k].x,
                        this.catalogModel.images[j][k].y,
                        size.width,
                        size.height,
                    );
                    this.pages[i].addText(
                        "Entrez un texte ici (double cliquez)",
                        this.catalogModel.images[j][k].x + this.catalogModel.texts[j][k].offsetX,
                        this.catalogModel.images[j][k].y + size.height + this.catalogModel.texts[j][k].offsetY,
                        this.catalogModel.imageDescriptionsStyle
                    );
                    pictureCount++;
                }
                j++; // go to next page model type
                i++; // go to next page
            }
        }
    }

    private resizeImageCorrectly(picture:Picture, maxWidth:number, maxHeight:number) {
        const size = {
            width: 0, 
            height: 0
        };
        size.width = picture.width;
        size.height = picture.height;
        // if the picture is smaller and can fit the box that will contains the picture
        if (size.height <= maxHeight && size.width <= maxWidth) {
            // do anything and return the same size
            return size;
        }
        // else shrink the size of the picture until it fit the box
        while(size.width > maxWidth || size.height > maxHeight) {
            size.width/=1.1;
            size.height/=1.1;
        }
        return size;
    }

    private resizeCoverImageCorrectly(picture:Picture, pageWidth:number, pageHeight:number) {
        const size = {width: 0, height: 0};
        size.width = picture.width;
        size.height = picture.height;
        // the image must cover the height of the page
        while(size.height > pageHeight) {
            size.height /= 1.1;
            size.width /= 1.1;
        }
        return size;
    }

    private insertPageNumber() {
        for (let i = 1; i < this.pageNumber - 1; i++) {
            let text = (i % 2) !== 0 ?  `${i} | ${this.customInfo.title.toLowerCase()}` : `${i}`;
            this.pages[i].addText(
                text, 
                this.catalogModel.pageNumber[i%2].x, 
                this.catalogModel.pageNumber[i%2].y, 
                this.catalogModel.pageNumberStyle
            );
        }
    }

    private insertSummary() {
        this.pages[this.pages.length - 1].addText(
            this.customInfo.resume,
            this.catalogModel.summary.position.x,
            this.catalogModel.summary.position.y,
            this.catalogModel.summary.style
        );
    }

    private insertBackCoverDecorations() {
        for (let decoration of this.catalogModel.backCoverDecorations) {
            this.pages[this.pages.length-1].addDecoration(decoration);
        }
    }

    private insertBackCoverTextDecorations() {
        for (let textDecoration of this.catalogModel.backCoverTextDecorations) {
            this.pages[this.pages.length - 1].addText(textDecoration.text, textDecoration.position.x, textDecoration.position.y, textDecoration.style);
        }
    }

    private insertTel() {
        this.pages[this.pages.length-1].addText(this.customInfo.phone, this.catalogModel.tel.position.x, this.catalogModel.tel.position.y, this.catalogModel.tel.style);
    }

    private insertMail() {
        this.pages[this.pages.length-1].addText(this.customInfo.mail, this.catalogModel.mail.position.x, this.catalogModel.mail.position.y, this.catalogModel.mail.style);
    }

    private insertTuringGallerySignature() {
        const logoUrl = "../../assets/img/logo.png";
        const content = "généré par Turing-gallery - 2020";
        const contentStyle = new TextStyle();
        contentStyle.fontSize = 20;
        contentStyle.fontFamily = "Arial";
        contentStyle.width = this.catalogModel.pageWidth;
        const logoSize = 250;
        const marginBottom = 50;
        this.pages[this.pages.length-1].addImage(logoUrl, (this.catalogModel.pageWidth - logoSize) / 2, this.catalogModel.pageHeight - (marginBottom + logoSize), logoSize, logoSize, 1);
        this.pages[this.pages.length-1].addText(content, 0, this.catalogModel.pageHeight - 50, contentStyle);
    }

    private insertInfoBack() {
        // insert author name
        this.pages[this.pages.length-1].addText(this.customInfo.author, this.catalogModel.authorBack.position.x, this.catalogModel.authorBack.position.y, this.catalogModel.authorBack.style);
        // insert enterprise name
        this.pages[this.pages.length-1].addText(this.customInfo.enterprise, this.catalogModel.enterpriseBack.position.x, this.catalogModel.enterpriseBack.position.y, this.catalogModel.enterpriseBack.style);
    }

   
}