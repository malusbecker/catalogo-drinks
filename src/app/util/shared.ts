import { Constants } from './constants';
import { Receita } from '../model/receita';

export class Shared {
  constructor() {}

  public static initializeWebStorage(): void {
    if (localStorage.getItem(Constants.NAME_KEY) != null) {
      return;
    }

    let receita = new Receita(Constants.NAME_KEY);

    localStorage.setItem(Constants.NAME_KEY, JSON.stringify(receita));
    localStorage.setItem(Constants.NAME_KEY, JSON.stringify([]));

  }
}
