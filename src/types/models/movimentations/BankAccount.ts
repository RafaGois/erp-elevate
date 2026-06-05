import User from "../User";

export default class BankAccount {
    private _id: string;
    private _name: string;
    private _User: User;

    constructor(
        id: string,
        name: string,
        User: User
    ) {
        this._id = id;
        this._name = name;
        this._User = User;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get User() {
        return this._User;
    }
}
