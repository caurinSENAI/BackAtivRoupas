import { v4 as uuidv4 } from "uuid";

export class Clothe {
    constructor(name, price, image, color, size, amount, type) {
        this.id = uuidv4();
        this.name = name;
        this.price = price;
        this.image = image;
        this.color = color;
        this.size = size;
        this.amount = amount;
        this.type = type;

    }
}