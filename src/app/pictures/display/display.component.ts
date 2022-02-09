import { Component, OnInit } from '@angular/core';
import { Picture } from '../picture';
import { PictureService } from '../picture.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})

export class DisplayComponent implements OnInit {

  pictures: Picture[] = [];
  total: number[] = [];
  remove: number[] = [];
  actualpage: number;
  username: string = sessionStorage.getItem('username');

  constructor(private service: PictureService) { }

  ngOnInit() {
    this.actualpage = 1;
    this.getPictures(1);
  }

  isPicturesEmpty = (): boolean => {
    return this.service.isUploading == false && this.pictures.length == 0;
  }

  isPageEmpty = (): boolean => {
    return this.pictures.length == 0;
  }

  getTotalRemove = (): boolean => {
    return this.remove.length == 0;
  }

  getTotalPage = (): number => {
    return this.total[this.total.length - 1];
  }

  setRemove = (id: number): void => {
    let index = this.remove.indexOf(id);
    let element = document.getElementById('pic' + id + '');
    if (index == -1) {
      this.remove.push(id);
      element.style.background = 'green';
    }
    else {
      this.remove.splice(index, 1);
      element.style.background = '';
    }
  }

  getPictures = (page: number): void => {
    this.actualpage = page;
    this.pictures = [];
    this.total = [];
    this.remove = [];
    this.service.get(this.pictures, this.total, this.username, page);
  }

  removePictures = (): void => {
    this.service.remove(this.remove, this.username);
  }

}