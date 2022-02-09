import { Component, OnInit } from '@angular/core';
import { CatalogModel, generateDefaultCatalogModels } from '../catalog-model';


@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {

  catalogModels: CatalogModel[] = [];
  pages = [];
  currentModel = 1;
  selectedModel = 0;
  currentPages = 1;
  pagesNumber = 1;
  pageNumber = 1;
  startPage = 0;
  currentInput = null;

  constructor() { 
  }

  ngOnInit() {
    // get default catalog models
    this.catalogModels = generateDefaultCatalogModels();
    const pageLeft = (this.catalogModels[this.currentModel-1].pagesImgUrl.length % 3);
    this.pagesNumber = Math.trunc(this.catalogModels[this.currentModel-1].pagesImgUrl.length / 3);
    if (pageLeft > 0) {
      this.pagesNumber++;
    }
    this.pageNumber = this.catalogModels[this.currentModel-1].pagesImgUrl.length;
    // set first pages to show 
    this.updatePagesToShow();
  }

  updatePagesToShow() {
    this.pages = [];
    for (let i = this.startPage, j = 0; i < this.pageNumber && j < 3; i++, j++) {
      this.pages.push(this.catalogModels[this.currentModel-1].pagesImgUrl[i]);
    }
  }

  onClickNextPages() {
    if (this.currentPages < this.pagesNumber) {
      this.currentPages++;
      this.startPage += 3;
      this.updatePagesToShow();
    }
  }

  onClickPreviousPages() {
    if (this.currentPages > 1) {
      this.currentPages--;
      this.startPage -= 3;
      this.updatePagesToShow();
    }
  }

  onChangeSelectModel(e, basicModal) {
    this.currentInput = e.target;
    if(e.target.checked){
      this.selectedModel = this.currentModel;
      basicModal.show();
    }
  }

  isComponentValid() {
    return this.selectedModel !== 0;
  }

  onClickCancel() {
    if (this.currentInput !== null) {
      // uncheck the current input
      this.currentInput.checked = false;
      // reinit selected model
      this.selectedModel = 0;
    }
  }

}
