import MovimentationType from "./Type";

export default class MovimentationCategory {
    private _id: string;
    private _name: string;
    private _typeId: string;
    private _Type: MovimentationType;

    constructor(
        id: string,
        name: string,
        typeId: string,
        Type: MovimentationType
    ) {
        this._id = id;
        this._name = name;
        this._typeId = typeId;
        this._Type = Type;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get typeId() {
        return this._typeId;
    }

    get Type() {
        return this._Type;
    }
}
