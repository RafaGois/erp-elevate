import User from "../User";
import BankAccount  from "./BankAccount";
import MovimentationCategory  from "./Category";
import MovimentationType  from "./Type";

export default class Movimentation {

    private _id: string;
    private _description: string;
    private _value: number;
    private _date: Date;
    private _User: User;
    private _Type: MovimentationType;
    private _BankAccount: BankAccount;
    private _Category: MovimentationCategory;

    constructor(
        id: string,
        description: string,
        value: number,
        date: Date,
        User: User,
        Type: MovimentationType,
        BankAccount: BankAccount,
        Category: MovimentationCategory
    ) {
        this._id = id;
        this._description = description;
        this._value = value;
        this._date = date;
        this._User = User;
        this._Type = Type;
        this._BankAccount = BankAccount;
        this._Category = Category;
    }

    get id() {
        return this._id;
    }

    get description() {
        return this._description;
    }

    get value() {
        return this._value;
    }

    get date() {
        return this._date;
    }

    get User() {
        return this._User;
    }

    get Type() {
        return this._Type;
    }

    get BankAccount() {
        return this._BankAccount;
    }

    get Category() {
        return this._Category;
    }
}
