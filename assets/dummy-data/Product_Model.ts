export interface ProductType {
  id: string | number;
  name: string;
  variants: Variant[];
  ownerID: string | number;
}

interface VariantType {
  img: string;
  color: string;
  description: string;
  label: string;
  price: number;
}

class Product implements ProductType {
  id: string | number;
  name: string;
  variants: VariantType[];
  ownerID: string | number;
  constructor(
    id: string | number,
    name: string,
    variants: VariantType[],
    ownerID: string | number,
  ) {
    this.id = id;
    this.name = name;
    this.variants = variants;
    this.ownerID = ownerID;
  }
}

export class Variant implements VariantType {
  color: string;
  description: string;
  img: string;
  label: string;
  price: number;
  constructor(
    color: string,
    description: string,
    img: string,
    label: string,
    price: number,
  ) {
    this.color = color;
    this.description = description;
    this.img = img;
    this.label = label;
    this.price = price;
  }
}

export default Product;
