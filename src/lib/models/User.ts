import { UserLevel } from "../enums/UserLevel";

export default class User {
    private _id: string;
    private _name: string;
    private _username: string;
    private _password: string;
    private _token?: string;
    private _level: UserLevel;

    constructor(
        id: string,
        name: string,
        username: string,
        password: string,
        token?: string,
        level?: UserLevel,
    ) {
        this._id = id;
        this._name = name;
        this._username = username;
        this._password = password;
        this._token = token;
        this._level = level ?? UserLevel.USER;
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

    get level() {
        return this._level;
    }
}