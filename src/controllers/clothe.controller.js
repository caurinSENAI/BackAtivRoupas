import { Clothe } from '../models/clothe.model.js';
import { ClotheList } from '../models/clotheList.model.js';

const clotheList = new ClotheList();

export const getClothes = (req, res) => {
    const { type } = req.query;

    if (type) {
        const clothes = clotheList.getClotheByType(type);
        if (!clothes) {
            return res.status(404).send({ message: "Clothe not found" });
        }
        return res.status(200).send({ message: `Clothe found ${clothes.length}`, clothes });
    }


    const { color } = req.query;

    if (color) {
        const clothes = clotheList.getClotheByColor(color);
        if (!clothes) {
            return res.status(404).send({ message: "Clothe not found" });
        }
        return res.status(200).send({ message: `Clothe found ${clothes.length}`, clothes });
    }


    const { size } = req.query;
    
    if (size) {
        const clothes = clotheList.getClotheBySize(size);
        if (!clothes) {
            return res.status(404).send({ message: "Clothe not found" });
        }
        return res.status(200).send({ message: `Clothe found ${clothes.length}`, clothes });
    }


    const { size: sizeType, type: sizeTypeType } = req.query;

    if (sizeType && sizeTypeType) {
        const clothes = clotheList.getClotheBySizeType(sizeType, sizeTypeType);
        if (!clothes) {
            return res.status(404).send({ message: "Clothe not found" });
        }
        return res.status(200).send({ message: `Clothe found ${clothes.length}`, clothes });
    }


    const clothe = clotheList.getAllClothes();

    return res.status(200).send({ message: `Clothe found 20`, clothe });
}

export const getClotheById = (req, res) => {
    const { id } = req.params;

    const clothe = clotheList.getClotheById(id);

    if (!clothe) {
        return res.status(404).send({ message: "Clothe not found" });
    }

    return res.status(200).send(clothe);
}

export const addClothe = (req, res) => {
    //dentro desse array irei colocar todos erros para serem exibidos juntos
    const errors = []
    const errorType = []
    const errorNumber = []
    const moreErrors = []

    let { name, price, image, color, size, amount, type } = req.body;
    size = size.toUpperCase();

    if (!name) {
        errors.push("Name");
    }
    if (price == undefined) {
        errors.push("Price");
    }
    if (!image) {
        errors.push("Image");
    }
    if (!color) {
        errors.push("Color");
    }
    if (!size) {
        errors.push("Size");
    }
    if (amount == undefined) {
        errors.push("Amount");
    }
    if (!type) {
        errors.push("Type");
    }
    if (errors.length) {
        return res.status(400).send({ message: `Missing ${errors.join(", ")} fields` });
    }


    if (typeof name !== "string") {
        errorType.push("Name must be a string")
    }
    if (typeof price !== "number") {
        errorType.push("Price must be a number")
    }
    if (isURLValid(image) === false) {
        errorType.push("Image must be a valid URL")
    }
    if (typeof color !== "string") {
        errorType.push("Color must be a string")
    }
    if (typeof size !== "string") {
        errorType.push("Size must be a string")
    }
    if (typeof amount !== "number") {
        errorType.push("Amount must be a number")
    }
    if (typeof type !== "string") {
        errorType.push("Type must be a string")
    }
    if (errorType.length) {
        return res.status(400).send({ message: `${errorType.join(", ")}` });
    }


    if (price <= 0) {
        errorNumber.push("Price must be greater than 0")
    }
    if (amount <= 0) {
        errorNumber.push("Amount must be greater than 0")
    }
    if (amount > 15000) {
        errorNumber.push("Amount must be less than 15000")
    }
    if (amount % 1 !== 0) {
        errorNumber.push("Amount must be an integer")
    }
    if (errorNumber.length) {
        return res.status(400).send({ message: `${errorNumber.join(", ")}` });
    }


    if (color.length > 20) {
        moreErrors.push("Color must be less than 20 characters")
    }
    if (size != "PP" && size != "P" && size != "M" && size != "G" && size != "GG") {
        moreErrors.push("Size must be PP, P, M, G or GG")
    }
    if (type.length > 50) {
        moreErrors.push("Type must be less than 50 characters")
    }
    if (name.length < 6 || name.length > 50) {
        moreErrors.push("Name must be between 6 and 50 characters")
    }
    if (moreErrors.length) {
        return res.status(400).send({ message: `${moreErrors.join(", ")}` });
    }



    const clothe = new Clothe(name, price, image, color, size, amount, type);

    clotheList.addClothe(clothe);

    return res.status(200).send({ message: "Clothe created", clothe });
}

export const removeClothe = (req, res) => {
    const { id } = req.params;

    const clothe = clotheList.getClotheById(id);

    if (!clothe) {
        return res.status(404).send({ message: "Clothe not found" });
    }

    clotheList.removeClothe(id);

    return res.status(200).send({ message: "Clothe deleted" });
}

export const editClothe = (req, res) => {
    const { id } = req.params;
    let { name, price, image, color, size, amount, type } = req.body;
    size = size.toUpperCase();

    const errors = []
    const errorType = []
    const errorNumber = []
    const moreErrors = []


    if (!name) {
        errors.push("Name");
    }
    if (price == undefined) {
        errors.push("Price");
    }
    if (!image) {
        errors.push("Image");
    }
    if (!color) {
        errors.push("Color");
    }
    if (!size) {
        errors.push("Size");
    }
    if (amount == undefined) {
        errors.push("Amount");
    }
    if (!type) {
        errors.push("Type");
    }
    if (errors.length) {
        return res.status(400).send({ message: `Missing ${errors.join(", ")} fields` });
    }


    if (typeof name !== "string") {
        errorType.push("Name must be a string")
    }
    if (typeof price !== "number") {
        errorType.push("Price must be a number")
    }
    if (isURLValid(image) === false) {
        errorType.push("Image must be a valid URL")
    }
    if (typeof color !== "string") {
        errorType.push("Color must be a string")
    }
    if (typeof size !== "string") {
        errorType.push("Size must be a string")
    }
    if (typeof amount !== "number") {
        errorType.push("Amount must be a number")
    }
    if (typeof type !== "string") {
        errorType.push("Type must be a string")
    }
    if (errorType.length) {
        return res.status(400).send({ message: `${errorType.join(", ")}` });
    }


    if (price <= 0) {
        errorNumber.push("Price must be greater than 0")
    }
    if (amount <= 0) {
        errorNumber.push("Amount must be greater than 0")
    }
    if (amount > 15000) {
        errorNumber.push("Amount must be less than 15000")
    }
    if (amount % 1 !== 0) {
        errorNumber.push("Amount must be an integer")
    }
    if (errorNumber.length) {
        return res.status(400).send({ message: `${errorNumber.join(", ")}` });
    }

    const clotheUpdated = clotheList.updateClother(id, name, price, image, color, size, amount, type);

    if (color.length > 20) {
        moreErrors.push("Color must be less than 20 characters")
    }
    if (size != "PP" && size != "P" && size != "M" && size != "G" && size != "GG") {
        moreErrors.push("Size must be PP, P, M, G or GG")
    }
    if (type.length > 50) {
        moreErrors.push("Type must be less than 50 characters")
    }
    if (name.length < 6 || name.length > 50) {
        moreErrors.push("Name must be between 6 and 50 characters")
    }
    if (moreErrors.length) {
        return res.status(400).send({ message: `${moreErrors.join(", ")}` });
    }

    const clothe = clotheList.getClotheById(id);
    
    if (!clothe) {
        return res.status(404).send({ message: "Clothe not found" });
    }



    return res.status(200).send({ message: "Clothe edited", clotheUpdated });
}

const isURLValid = (URL) => {
    const regex = new RegExp(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g);
    return regex.test(URL);
}

