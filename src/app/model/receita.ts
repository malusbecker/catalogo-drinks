
export class Receita {
  public id!: string;
  public nome?: string;
  public ingred?: string;
  public modoprep?: string;
  public tipo: string;


  constructor(nome:string, ingred:string, modoprep:string, tipo:string) {

    this.id = String(Math.round(Math.random() * 1000));
    this.nome = nome;
    this.ingred = ingred;
    this.modoprep = modoprep;
    this.tipo = tipo;

    }
  }

