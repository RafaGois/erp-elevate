import MovimentationType from "../../enums/MovimentationType";

export default class MovimentationCategory {
  private _id: string;
  private _name: string;
  private _Type: MovimentationType;

  constructor(id: string, name: string, type: MovimentationType) {
    this._id = id;
    this._name = name;
    this._Type = type ?? MovimentationType.ENTRADA;
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
