export default class Project {
    private _id: string;
    private _name: string;
    private _active: boolean;

    constructor(
        id: string,
        name: string,
        active: boolean,
    ) {
        this._id = id;
        this._name = name;
        this._active = active;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get active() {
        return this._active;
    }
}
