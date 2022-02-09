import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormControl, FormBuilder } from '@angular/forms';
import { Picture } from 'src/app/pictures/picture';
import { PictureService } from 'src/app/pictures/picture.service';
import { CatalogModel } from '../catalog-model';



@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.scss']
})

export class CustomizeComponent implements OnInit {
  @Input() catalogModel: CatalogModel;
  email = new FormControl('votremail@example.fr', [Validators.required, Validators.email]);
  titre = new FormControl('Titre du catalogue', [Validators.required]);
  description = new FormControl('Description du catalogue', [Validators.required]);
  resume = new FormControl('Un bref résumé du contenus du catalogue', [Validators.required]);
  tel = new FormControl('XX XX XX XX XX', [Validators.required]);
  entreprise = new FormControl('Nom de l\'entreprise', [Validators.required]);
  auteur = new FormControl('Nom de l\'auteur', [Validators.required]);

  /** all pictures that have been added */
  pic1: Picture = null;
  pic2: Picture = null;


  constructor(public fb: FormBuilder, private service: PictureService) {
  }

  ngOnInit() {
  }

  isComponentValid() {
    // TODO : test if component is valid, return true if it's the case, false otherwise
    return (
      this.pic1 && this.pic2 &&
      this.pic1.isValid && 
      this.pic1.canFit(this.catalogModel.pageWidth, this.catalogModel.pageHeight) &&
      this.pic2.isValid && 
      this.pic2.canFit(this.catalogModel.pageWidth, this.catalogModel.pageHeight) &&
      !this.titre.hasError('required') &&
      !this.auteur.hasError('required') &&
      !this.email.hasError('email') &&
      !this.description.hasError('required') &&
      !this.entreprise.hasError('required') &&
      !this.tel.hasError('required')
    )
  }

  // email
  getErrorMessage() {
    return this.email.hasError('required') ? 'Vous devez saisir votre email' :
      this.email.hasError('email') ? 'email non valide' :
        '';
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  // titre
  getErrorMessage1() {
    return this.titre.hasError('required') ? 'Vous devez saisir un titre' :
      this.titre.hasError('titre') ? 'Titre non valide' :
        '';
  }

  // description
  getErrorMessage2() {
    return this.description.hasError('required') ? 'Vous devez saisir une description' :
      this.description.hasError('description') ? 'Description non valide' :
        '';
  }

  //  resume

  getErrorMessage3() {
    return this.resume.hasError('required') ? 'Vous devez saisir un résumé ' :
      this.resume.hasError('resume') ? 'Résumé non valide' :
        '';
  }

  //  tel
  getErrorMessage4() {
    return this.tel.hasError('required') ? 'Vous devez entrer votre numéro de téléphone' :
      this.tel.hasError('tel') ? 'Numéro de téléphone invalide' :
        '';

  }

  // entreprise
  getErrorMessage5() {
    return this.entreprise.hasError('required') ? 'Vous devez entrer le nom de votre entreprise' :
      this.entreprise.hasError('entreprise') ? 'Nom non valide ' :
        '';
  }
  // auteur
  getErrorMessage6() {
    return this.auteur.hasError('required') ? 'Vous devez renseigner le nom de l\'auteur' :
      this.auteur.hasError('entreprise') ? 'Nom non valide' :
        '';
  }


  preview2 = (files: any[]): void => {
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
            this.pic1 = picture;
          };
        };
      }
    }
  }

  preview1 = (files: any[]): void => {
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
            this.pic2 = picture;
          };
        };
      }
    }
  }


}
