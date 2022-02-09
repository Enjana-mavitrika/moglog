export class CustomInfo {
    title: string = "TITRE DU CATALOGUE";
    month: string = this.getCurrentMonth();
    year: number = this.getCurrentYear();
    enterprise: string = "Nom de l'entreprise";
    mail: string = "mon-mail@me.fr";
    phone: string = "0780901246 ";
    author: string = "Nom Prénom";
    description: string = "Description briève du contenus de ce catalogue";
    resume: string = "Résumé des informations utiles dans ce catalogue";

    private getCurrentMonth(): string {
      const d = new Date();
      const month = new Array();
      month[0] = "JANVIER";
      month[1] = "FÉVRIER";
      month[2] = "MARS";
      month[3] = "AVRIL";
      month[4] = "MAI";
      month[5] = "JUIN";
      month[6] = "JUILLET";
      month[7] = "AOÛT";
      month[8] = "SEPTEMBRE";
      month[9] = "OCTOBRE";
      month[10] = "NOVEMBRE";
      month[11] = "DÉCEMBRE";
      return month[d.getMonth()];
    }

    private getCurrentYear(): number {
      const d = new Date();
      return d.getFullYear();
    }
  }