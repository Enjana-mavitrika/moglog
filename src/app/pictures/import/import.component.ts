
import { Component, OnInit, Input } from '@angular/core';
import { Picture } from '../picture';
import { PictureService } from '../picture.service';


@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {
  @Input() showImport: boolean = true;
  /** all pictures that have been added */
  pictures: Picture[] = [];
  /** number of valid picture */
  validPictureCount = 0;
  /** number of invalid picture */
  invalidPictureCount = 0;
  /** delete picture indicator */
  isShownDeletes = {};
  shownDeleteIndex = -1;
  deletedPicture = null;

  constructor(private service: PictureService) { }

  ngOnInit() {
  }

  isComponentValid() {
    return this.pictures.length > 0 && this.validPictureCount > 0 && this.invalidPictureCount == 0;
  }

  startUpload = () => {
    this.service.post(this.pictures);
    this.reinitPicture();
  }

  reinitPicture = () => {
    this.pictures = [];
    this.validPictureCount = 0;
    this.invalidPictureCount = 0;
  }

  onClickDeletePicture = (picture: Picture): void => {
    this.deletedPicture = picture;
  }

  deletePicture = (): void => {
    if (this.deletedPicture !== null) {
      this.pictures = this.pictures.filter((currentPicture) => {
        return this.deletedPicture !== currentPicture;
      });
      this.updatePictureCounter();
      this.reinitDeletedPicture();
    }
  }

  reinitDeletedPicture = (): void => {
    this.deletedPicture = null;
  }

  updatePictureCounter = (): void => {
    if (this.deletedPicture.isValid) {
      this.validPictureCount--;
    } else {
      this.invalidPictureCount--;
    }
  }

  onMouseoverPicture = (index: number): void => {
    for (let i = 0; i < this.pictures.length; i++) {
      this.isShownDeletes['' + i] = false;
    }
    this.isShownDeletes['' + index] = true;
    this.shownDeleteIndex = index;
  }

  onMouseleavePreview = (): void => {
    this.isShownDeletes['' + this.shownDeleteIndex] = false;
  }

  preview = (files: any[]): void => {
    if (files.length === 0) {
      return;
    }
    for (const file of files) {
      // check if file is an image
      if (file.type.match(/image\/*/) !== null) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          const image = new Image();
          image.src = reader.result as string;
          image.onload = () => {
            const picture = new Picture();
            picture.postPicture(
              reader.result as string,
              image.height,
              image.width,
              file
            );
            this.pictures.push(picture);
            if (picture.isValid) {
              this.validPictureCount++;
            } else {
              this.invalidPictureCount++;
            }
          };
        };
      }
    }
  }

}
