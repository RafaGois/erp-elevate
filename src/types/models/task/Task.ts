import User from "../User";
import { TaskStatus as Status } from "../../enums/TaskStatus";
import { TaskPriorities as Priority } from "../../enums/TaskPriorities";
import Project from "../Project";

export default class Task {

    private _id: string;
    private _name: string;
    private _description: string;
    private _deadline: Date;
    private _responsibleId: string;
    private _projectId: string;
    private _Status: Status;
    private _Priority: Priority;
    private _Responsible: User;
    private _Project: Project;
    
    private _createdAt: Date;
    private _updatedAt: Date;

    constructor(
        id: string,
        name: string,
        description: string,
        responsibleId: string,
        projectId: string,
        createdAt: Date,
        updatedAt: Date,
        deadline: Date,
        Responsible: User,
        Status: Status,
        Priority: Priority,
        Project: Project,
    ) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._responsibleId = responsibleId;
        this._projectId = projectId;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
        this._deadline = deadline;
        this._Responsible = Responsible;
        this._Status = Status;
        this._Priority = Priority;
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

    set Status(newStatus: Status) {
        this._Status = newStatus;
    }
    
    get Priority() {
        return this._Priority;
    }


    get Project() {
        return this._Project;
    }
}