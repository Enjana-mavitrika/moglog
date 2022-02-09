import { SafeUrl } from '@angular/platform-browser';

export class TextStyle {
  fontSize: number = 20;
  fontFamily: string = "Dancing Script";
  fontStyle: string = "normal";
  align: string =  "center";
  fill: string = "black";
  rotation = 0;
  width = 380;
  height = 50;
}

class Position {
  x: number = 0;
  y: number = 0;
  constructor(x:number, y:number) {
    this.x = x;
    this.y = y;
  }
}


export class Decoration {
  type: string = "rect";
  width: number = 0;
  height: number = 0;
  fill: string = "black";
  position: Position = null;
  constructor(type: string, width: number, height: number, fill: string, position: Position) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.fill = fill;
    this.position = position;
  }
}

export class TextDecoration {
  text: string = "";
  style: TextStyle = new TextStyle();
  position: Position = new Position(0, 0);
  constructor(text: string, style: TextStyle, position: Position) {
    this.text = text;
    this.style = style;
    this.position = position;
  }
}

export class CatalogModel {
    pagesImgUrl: SafeUrl[];
    IMG_MAX_PER_PAGE_TYPE: number[];
    pageFormat = "A4";
    pageWidth = 827;
    pageHeight = 1170;
    images = [];
    texts = [];
    title: Position = new Position(30, 50);
    pageNumber: Position[] = [];
    pageNumberStyle = new TextStyle();
    imageDescriptionsStyle = new TextStyle();
    titleStyle = new TextStyle();
    catalogDescriptionStyle = new TextStyle();
    catalogDescription: Position = null;
    coverDecorations: Decoration[] = [];
    month: any = { style: new TextStyle(), position: new Position(0, 0) };
    author: any = { style: new TextStyle(), position: new Position(0, 0) };
    enterprise: any = { style: new TextStyle(), position: new Position(0, 0) };
    totalPageNumber: any = { style: new TextStyle(), position: new Position(0, 0) };
    authorBack: any = { style: new TextStyle(), position: new Position(0, 0) };
    enterpriseBack: any = { style: new TextStyle(), position: new Position(0, 0) };
    summary: any = { style: new TextStyle(), position: new Position(0, 0) };
    backCoverDecorations: Decoration[] = [];
    backCoverTextDecorations: TextDecoration[] = [];
    tel: any = { style: new TextStyle(), position: new Position(0, 0) };
    mail: any = { style: new TextStyle(), position: new Position(0, 0) };

}


export const generateDefaultCatalogModels = (): CatalogModel[] => {
    const catalogModels = [];
    const catalogModel1 = new CatalogModel();
    catalogModel1.pagesImgUrl = [
      "../../../../assets/img/modele-catalog/modele-1/modele-cover-face.png",
      "../../../../assets/img/modele-catalog/modele-1/modele-1.png",
      "../../../../assets/img/modele-catalog/modele-1/modele-2.png",
      "../../../../assets/img/modele-catalog/modele-1/modele-3.png",
      "../../../../assets/img/modele-catalog/modele-1/modele-cover-back.png"
    ];
    catalogModel1.imageDescriptionsStyle.fontFamily = "Dancing Script";
    // configure number of images per page
    catalogModel1.IMG_MAX_PER_PAGE_TYPE = [4, 3, 3];
    // configure each images in each pages to fit the model
    catalogModel1.images.push([
      { x: 30, y: 50, maxWidth: 380, maxHeight: 500 },
      { x: (catalogModel1.pageWidth - 30 - 380), y: 50, maxWidth: 380, maxHeight: 500 },
      { x: 50, y: 520, maxWidth: 300, maxHeight: 300 },
      { x: (catalogModel1.pageWidth - 30 - 380), y: 520, maxWidth: 380, maxHeight: 500 }
    ]);
    catalogModel1.images.push([
      { x: 50, y: 50, maxWidth: 380, maxHeight: 500 },
      { x: (catalogModel1.pageWidth - 30 - 380), y: 350, maxWidth: 380, maxHeight: 500 },
      { x: 50, y: (350 + 300), maxWidth: 380, maxHeight: 500 }
    ]);
    catalogModel1.images.push([
      { x: (catalogModel1.pageWidth - 30 - 380), y: 50, maxWidth: 380, maxHeight: 500 },
      { x: 50, y: 350, maxWidth: 380, maxHeight: 500 },
      { x: (catalogModel1.pageWidth - 30 - 380), y: (350 + 300), maxWidth: 380, maxHeight: 500 }
    ]);
    catalogModels.push(catalogModel1);
    // configure each texts in each pages to fit the model
    for (let i = 0; i < catalogModel1.IMG_MAX_PER_PAGE_TYPE.length; i++) {
      catalogModel1.texts[i] = [];
      for (let j = 0; j < catalogModel1.IMG_MAX_PER_PAGE_TYPE[i]; j++) {
        catalogModel1.texts[i].push({ offsetX: 0, offsetY: 30 });
      }
    }
    // configure title of the catalog
    catalogModel1.titleStyle.fontStyle = "bold";
    catalogModel1.titleStyle.width = catalogModel1.pageWidth * 0.9;
    catalogModel1.titleStyle.fontSize = 50;
    catalogModel1.titleStyle.fontFamily = "Playfair Display";
    catalogModel1.title.x = (catalogModel1.pageWidth * 0.1) / 2;
    // configure page number style 
    catalogModel1.pageNumberStyle.fontStyle = "bold";
    catalogModel1.pageNumberStyle.fontSize = 20;
    catalogModel1.pageNumberStyle.fontFamily = "Playfair Display";
    catalogModel1.pageNumberStyle.align = "left";
    // configure page number position
    const offsetPageNumber = 25;
    catalogModel1.pageNumber[0] = new Position(catalogModel1.pageWidth - offsetPageNumber, catalogModel1.pageHeight - offsetPageNumber); // page on the right (even) 
    catalogModel1.pageNumber[1] = new Position(offsetPageNumber, catalogModel1.pageHeight - offsetPageNumber); // page on the left (odd)
    // configure catalog description style 
    catalogModel1.titleStyle.fontStyle = "italic";
    catalogModel1.catalogDescriptionStyle.width = catalogModel1.pageWidth * 0.6;
    catalogModel1.catalogDescriptionStyle.fontSize = 35;
    catalogModel1.catalogDescriptionStyle.fontFamily = "Dancing Script";
    catalogModel1.catalogDescription = new Position((catalogModel1.pageWidth * 0.3) / 2, catalogModel1.title.y + 60);
    // add and configure cover decorations
    catalogModel1.coverDecorations.push(new Decoration(
      "rect", 550, 100, "black", new Position(0, catalogModel1.catalogDescription.y + 350) 
    ));
    // add and configure month style and position
    catalogModel1.month.style.fontFamily = "Playfair Display";
    catalogModel1.month.style.fontStyle = "bold";
    catalogModel1.month.style.fontSize = 40;
    catalogModel1.month.style.fill = "white";
    catalogModel1.month.style.align = "left";
    catalogModel1.month.style.width = 700
    catalogModel1.month.position.x = 50;
    catalogModel1.month.position.y = catalogModel1.catalogDescription.y + 350 + 30;
    // add and configure author name
    catalogModel1.author.style.fontFamily = "Playfair Display";
    catalogModel1.author.style.fontSize = 20;
    catalogModel1.author.style.rotation = 90;
    catalogModel1.author.position.x = 25;
    catalogModel1.author.position.y = catalogModel1.pageHeight - 300;
    // add and configure enterprise name
    catalogModel1.enterprise.style.fontFamily = "Playfair Display";
    catalogModel1.enterprise.style.fontSize = 20;
    catalogModel1.enterprise.position.x = 50;
    catalogModel1.enterprise.position.y = catalogModel1.pageHeight - 30;
    // add and configure total page number
    catalogModel1.totalPageNumber.style.fontFamily = "Playfair Display";
    catalogModel1.totalPageNumber.style.fontSize = 20;
    catalogModel1.totalPageNumber.position.x = catalogModel1.pageWidth - 300;
    catalogModel1.totalPageNumber.position.y = catalogModel1.pageHeight - 30;
    // add and configure summary
    catalogModel1.summary.position = catalogModel1.catalogDescription;
    catalogModel1.summary.style = catalogModel1.catalogDescriptionStyle;
    // add and configure decorations in back cover
    catalogModel1.backCoverDecorations.push( new Decoration(
      "rect", 300, 80, "black", new Position((catalogModel1.pageWidth - 300) / 2, catalogModel1.summary.position.y + 400)
    ) );
    // add and configure text decorations in back cover
    catalogModel1.backCoverTextDecorations.push( new TextDecoration(
      "CONTACT", catalogModel1.month.style ,new Position(310, catalogModel1.backCoverDecorations[0].position.y + 15) 
    ));
    // add and configure tel 
    catalogModel1.tel.style.fontFamily = "Arial";
    catalogModel1.tel.style.fontSize = 30;
    catalogModel1.tel.position.x = catalogModel1.backCoverDecorations[0].position.x - 50;
    catalogModel1.tel.position.y = catalogModel1.backCoverDecorations[0].position.y + 100;
    // add and configure mail
    catalogModel1.mail.style = catalogModel1.tel.style;
    catalogModel1.mail.position.x = catalogModel1.tel.position.x;
    catalogModel1.mail.position.y = catalogModel1.tel.position.y + 40;
    // add and configure enterprise on back cover
    catalogModel1.enterpriseBack.style = catalogModel1.author.style;
    catalogModel1.enterpriseBack.position = catalogModel1.author.position;
    // add and configure author on back cover
    catalogModel1.authorBack.style = catalogModel1.author.style;
    catalogModel1.authorBack.position.x = catalogModel1.author.position.x;
    catalogModel1.authorBack.position.y = 50;

    return catalogModels;
  }