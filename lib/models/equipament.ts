export class Equipament {
    private _uid: string;
    private _name: string;
    private _price: number;
    private _purchaseDate: Date;

    constructor(
        uid: string,
        name: string,
        price: number,
        purchaseDate: Date,
    ) {
        this._uid = uid;
        this._name = name;
        this._price = price;
        this._purchaseDate = purchaseDate;
    }

    get uid() {
        return this._uid;
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
}
