
export interface ITag{
    name:string,
    color:string,
    id?:number,
  }

export class Tag implements ITag{
  name:string;
  color:string;
  id?:number;

  constructor(name: string, color:string){
    this.name = name;
    this.color = color;
  }
}
