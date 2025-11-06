export class Equipament {
    private _id: string;
    private _name: string;
    private _price: number;
    private _purchaseDate: Date;
    private _categoryId: string;

    constructor(
        id: string,
        name: string,
        price: number,
        purchaseDate: Date,
        categoryId: string,
    ) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._purchaseDate = purchaseDate;
        this._categoryId = categoryId;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get price() {
        return this._price;
    }

    get purchaseDate() {
        return this._purchaseDate;
    }

    set purchaseDate(date: Date) {
        this._purchaseDate = date;
    }

    get categoryId() {
        return this._categoryId;
    }

    set categoryId(categoryId: string) {
        this._categoryId = categoryId;
    }
}
