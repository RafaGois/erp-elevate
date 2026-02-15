/* 

id           String   @id @default(uuid())
  originalName String
  storedPath   String   // caminho relativo, ex: uploads/abc-123.pdf
  mimeType     String?
  size         Int?     // tamanho em bytes
  budgetId String?
  budget Budget? @relation(fields: [budgetId], references: [id])
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

*/

import Budget from "./Budget";

export default class UploadedFile {
    private _id: string;
    private _originalName: string;
    private _storedPath: string;
    private _mimeType?: string;
    private _size?: number;
    private _budgetId?: string;
    private _Budget?: Budget;
    
    constructor(
        id: string,
        originalName: string,
        storedPath: string,
        mimeType?: string,
        size?: number,
        budgetId?: string,
        Budget?: Budget,
    ) {
        this._id = id;
        this._originalName = originalName;
        this._storedPath = storedPath;
        this._mimeType = mimeType;
        this._size = size;
        this._budgetId = budgetId;
        this._Budget = Budget;
    }

    get id() {
        return this._id;
    }

    get originalName() {
        return this._originalName;
    }

    get storedPath() {
        return this._storedPath;
    }

    get mimeType() {
        return this._mimeType;
    }

    get size() {
        return this._size;
    }

    get budgetId() {
        return this._budgetId;
    }

    get Budget() {
        return this._Budget;
    }
}