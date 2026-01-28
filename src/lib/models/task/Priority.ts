export default class Priority {
    private _id: string;
    private _name: string;
    private _level: number;

    constructor(id: string, name: string, level: number) {
        this._id = id;
        this._name = name;
        this._level = level;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get level() {
        return this._level;
    }

    set level(level: number) {
        this._level = level;
    }
}