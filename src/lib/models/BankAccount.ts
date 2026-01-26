import User from "./User";

export default class BankAccount {
    private _id: string;
    private _name: string;
    private _number: string;
    private _agency: string;
    private _userId: string;
    private _User: User;

    constructor(
        id: string,
        name: string,
        number: string,
        agency: string,
        userId: string,
        User: User
    ) {
        this._id = id;
        this._name = name;
        this._number = number;
        this._agency = agency;
        this._userId = userId;
        this._User = User;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get number() {
        return this._number;
    }

    get agency() {
        return this._agency;
    }

    get userId() {
        return this._userId;
    }

    get User() {
        return this._User;
    }
}
