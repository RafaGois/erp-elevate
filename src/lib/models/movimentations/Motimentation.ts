import User from "../User";
import BankAccount  from "./BankAccount";
import MovimentationCategory  from "./Category";
import Type  from "../../enums/MovimentationType";

export default class Movimentation {

    private _id: string;
    private _description: string;
    private _value: number;
    private _date: Date;
    private _User: User;
    private _userId: string;
    private _Type: Type;
    private _BankAccount: BankAccount;
    private _bankAccountId: string;
    private _Category: MovimentationCategory;
    private _categoryId: string;

    constructor(
        id: string,
        description: string,
        value: number,
        date: Date,
        User: User,
        userId: string,
        Type: Type,
        typeId: string,
        BankAccount: BankAccount,
        bankAccountId: string,
        Category: MovimentationCategory,
        categoryId: string
    ) {
        this._id = id;
        this._description = description;
        this._value = value;
        this._date = date;
        this._User = User;
        this._userId = userId;
        this._Type = Type;
        this._BankAccount = BankAccount;
        this._bankAccountId = bankAccountId;
        this._Category = Category;
        this._categoryId = categoryId;
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

    set date(date: Date) {
        this._date = date;
    }

    get userId() {
        return this._userId;
    }

    get User() {
        return this._User;
    }

    get Type() {
        return this._Type;
    }

    get bankAccountId() {
        return this._bankAccountId;
    }

    get BankAccount() {
        return this._BankAccount;
    }

    get categoryId() {
        return this._categoryId;
    }

    get Category() {
        return this._Category;
    }
}
