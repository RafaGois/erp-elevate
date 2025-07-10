import Equipament from "@/lib/models/Equipament";

export interface IEquipamentExit {
    uid: string;
    name: string;
    observation: string;
    equipaments: Equipament[];
    date: Date;
}

export default class EquipamentExit implements IEquipamentExit {
    private _uid: string;
    private _name: string;
    private _observation: string;
    private _equipaments: Equipament[];
    private _date: Date;

    constructor(
        uid: string,
        name: string,
        observation: string,
        equipaments: Equipament[],
        date: Date
    ) {
        this._uid = uid;
        this._name = name;
        this._observation = observation;
        this._equipaments = equipaments;
        this._date = date;
    }

    get uid() {
        return this._uid;
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