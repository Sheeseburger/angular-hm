import { UUID } from "angular2-uuid";
import { ITag } from "../tag/tag.model";

export interface IProduct{
    price:number,
    description:string,
    title:string,
    id?:number,
    stock:number,
    tags?:ITag[],
}

export class Product implements IProduct{
  price:number;
  description:string;
  title:string;
  id?:number;
  stock: number;
  tags?: ITag[];
  constructor(price: number, description:string, title:string, stock:number = 0){
    this.price = price;
    this.description = description;
    this.title = title;
    this.stock = stock;
    // this.id = UUID.UUID();
    // this.id = 0;
  }
}
