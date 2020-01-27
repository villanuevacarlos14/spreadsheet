export class Row {

  constructor(id: number)
  {
    this.Id = id;
  }

  Id: number;
  Values: Cell[] = [];
  
}

export class Cell
{
  constructor(id, name, isFormula, formula) {
    this.id = id;
    this.name = name;
    this.isFormula = isFormula;
    this.formula = formula;
  }

  id: string;
  name: string;
  isFormula: boolean = false;
  formula: string;
}
