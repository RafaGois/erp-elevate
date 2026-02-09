import MovimentationCategory from "./Category";
import MovimentationType from "./Type";

export default class Fixed {
    private _id: string;
    private _description: string;
    private _value: number;
    private _deadline: Date;
    private _typeId: string;
    private _Type: MovimentationType;
    private _categoryId: string;
    private _Category: MovimentationCategory;

    constructor(
        id: string,
        description: string,
        value: number,
        deadline: Date,
        typeId: string,
        categoryId: string,
        Type: MovimentationType,
        Category: MovimentationCategory
    ) {
        this._id = id;
        this._description = description;
        this._value = value;
        this._deadline = deadline;
        this._typeId = typeId;
        this._Type = Type;
        this._categoryId = categoryId;
        this._Category = Category;
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

    get deadline() {
        return this._deadline;
    }

    set deadline(deadline: Date) {
        this._deadline = deadline;
    }

    get typeId() {
        return this._typeId;
    }

    get Type() {
        return this._Type;
    }

    get categoryId() {
        return this._categoryId;
    }

    get Category() {
        return this._Category;
    }
}
