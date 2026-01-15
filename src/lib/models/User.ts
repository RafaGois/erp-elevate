export default class User {
    private _id: string;
    private _name: string;
    private _username: string;
    private _password: string;
    private _token?: string;
    
    constructor(
        id: string,
        name: string,
        username: string,
        password: string,
        token?: string,
    ) {
        this._id = id;
        this._name = name;
        this._username = username;
        this._password = password;
        this._token = token;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get username() {
        return this._username;
    }

    get password() {
        return this._password;
    }

    get token() {
        return this._token;
    }
}