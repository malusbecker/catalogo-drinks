
export class Receita {
  public id!: string;
  public nome?: string;
  public ingred?: string;
  public modoprep?: string;
  public alcool?: boolean;
  public nalcool?: boolean;

  constructor(nome:string) {

    this.id = String(Math.round(Math.random() * 1000));
    this.nome = nome;
    this.alcool = true;
    this.nalcool = false;
    }

    public static clone(receita: Receita) {
      let u: Receita = new Receita(receita.id);
      u.id = receita.id;
      u.nome = receita.nome;
      u.ingred = receita.ingred;
      u.modoprep = receita.modoprep;
      u.alcool = receita.alcool;
      u.nalcool = receita.nalcool;
      return u;
    }


  }

