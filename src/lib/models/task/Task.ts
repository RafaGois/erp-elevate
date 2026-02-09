import User from "../User";
import Status from "./Status";
import Priority from "./Priority";
import Type from "./TaskType";
import Project from "../Project";

export default class Task {

    private _id: string;
    private _name: string;
    private _description: string;
    private _responsibleId: string;
    private _statusId: string;
    private _priorityId: string;
    private _typeId: string;
    private _projectId: string;
    private _createdAt: Date;
    private _updatedAt: Date;
    private _deadline: Date;
    private _Responsible: User;
    private _Status: Status;
    private _Priority: Priority;
    private _Type: Type;
    private _Project: Project;

    constructor(
        id: string,
        name: string,
        description: string,
        responsibleId: string,
        statusId: string,
        priorityId: string,
        typeId: string,
        projectId: string,
        createdAt: Date,
        updatedAt: Date,
        deadline: Date,
        Responsible: User,
        Status: Status,
        Priority: Priority,
        Type: Type,
        Project: Project,
    ) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._responsibleId = responsibleId;
        this._statusId = statusId;
        this._priorityId = priorityId;
        this._typeId = typeId;
        this._projectId = projectId;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
        this._deadline = deadline;
        this._Responsible = Responsible;
        this._Status = Status;
        this._Priority = Priority;
        this._Type = Type;
        this._Project = Project;
    }

    get id() {
        return this._id;
    }

    get name() {    
        return this._name;
    }

    get description() {
        return this._description;
    }

    get responsibleId() {
        return this._responsibleId;
    }

    get statusId() {
        return this._statusId;
    }

    set statusId(statusId: string) {
        this._statusId = statusId;
    }

    get priorityId() {
        return this._priorityId;
    }

    get typeId() {
        return this._typeId;
    }

    get projectId() {
        return this._projectId;
    }

    get createdAt() {
        return this._createdAt;
    }

    get updatedAt() {
        return this._updatedAt;
    }

    get deadline() {
        return this._deadline;
    }

    set deadline(deadline: Date) {
        this._deadline = deadline;
    }
    
    get Responsible() {
        return this._Responsible;
    }

    get Status() {
        return this._Status;
    }
    
    get Priority() {
        return this._Priority;
    }

    get Type() {
        return this._Type;
    }

    get Project() {
        return this._Project;
    }
}