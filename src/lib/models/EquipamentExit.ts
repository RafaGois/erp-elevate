import { Equipament } from "@/lib/models/Equipament";

export class EquipamentExit {
    private _id: string;
    private _name: string;
    private _observation: string;
    private _equipaments: Equipament[];
    private _date: Date;

    constructor(
        id: string,
        name: string,
        observation: string,
        equipaments: Equipament[],
        date: Date  
    ) {
        this._id = id;
        this._name = name;
        this._observation = observation;
        this._equipaments = equipaments;
        this._date = date;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get observation() {
        return this._observation;
    }

    get equipaments() {
        return this._equipaments;
    }

    get date() {
        return this._date;
    }

    set equipaments(equipaments: Equipament[]) {
        this._equipaments = equipaments;
    }
}