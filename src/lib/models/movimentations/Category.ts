import Type from "../../enums/MovimentationType";

export default class MovimentationCategory {
    private _id: string;
    private _name: string;
    private _Type: Type;

    constructor(
        id: string,
        name: string,
        typeId: string,
        Type: Type
    ) {
        this._id = id;
        this._name = name;
        this._Type = Type;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get Type() {
        return this._Type;
    }
}
