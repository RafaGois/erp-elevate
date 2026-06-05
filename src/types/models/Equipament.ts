export class Equipament {
    private _id: string;
    private _name: string;
    private _price: number;
    private _code: string;
    private _purchaseDate: Date;
    private _categoryId: string;

    constructor(
        id: string,
        name: string,
        price: number,
        code: string,
        purchaseDate: Date,
        categoryId: string,
    ) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._code = code;
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

    get code() {
        return this._code;
    }

    get purchaseDate() {
        return this._purchaseDate;
    }

    set code(code: string) {
        this._code = code;
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
