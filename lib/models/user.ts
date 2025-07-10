export class User {
    private _uid?: string;
    private _name?: string;
    private _email: string;
    private _password: string;
    private _token?: string;
    private _provider?: string;
    
    constructor(
        email: string,
        password: string,
        uid?: string,
        name?: string,
        token?: string,
        provider?: string,
    ) {
        this._uid = uid;
        this._name = name;
        this._email = email;
        this._password = password;
        this._token = token;
        this._provider = provider;
    }

    get uid() {
        return this._uid;
    }

    get name() {
        return this._name;
    }

    get email() {
        return this._email;
    }

    get password() {
        return this._password;
    }

    get token() {
        return this._token;
    }

    get provider() {
        return this._provider;
    }
}