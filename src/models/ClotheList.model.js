export class ClotheList {
    constructor() {
        this.clothes = [];
    }

    getAllClothes() {
        return this.clothes;
    }

    getClotheById(id) {
        return this.clothes.find((clothe) => clothe.id === id);
    }

    addClothe(clothe) {
        this.clothes.push(clothe);
    }

    updateClother(id, name, price, image, color, size, amount, type) {
        this.clothes = this.clothes.map((c) => {
            if (c.id === id) {
                c.name = name;
                c.price = price;
                c.image = image;
                c.color = color;
                c.size = size;
                c.amount = amount;
                c.type = type;
            }
            return c;
        });
        return this.getClotheById(id)
    }

    getClotheByType(type) {
        return this.clothes.filter((clothe) => clothe.type === type);
    }

    getClotheByColor(color) {
        return this.clothes.filter((clothe) => clothe.color === color);
    }

    getClotheBySize(size) {
        return this.clothes.filter((clothe) => clothe.size === size);
    }

    getClotheBySizeType(size, type) {
        return this.clothes.filter((clothe) => clothe.size === size && clothe.type === type);
    }
    
    removeClothe(id) {
        this.clothes = this.clothes.
            filter(clothe => clothe.id !== id);
    }

}