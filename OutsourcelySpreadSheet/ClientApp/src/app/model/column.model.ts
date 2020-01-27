import { CommonService } from "../service/common.service";

export class Column {
  Id: number;
  Name: string;


  constructor(id: number)
  {
    this.Id = id;
    this.Name = CommonService.toLetters(id);
  }

  
}
