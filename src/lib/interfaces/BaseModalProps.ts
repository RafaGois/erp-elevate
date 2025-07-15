import ModalAction from "../enums/modalAction";
import { UseQueryResult } from "@tanstack/react-query";
import ExtraAttributes from "./ExtraAttributesProps";



export interface BaseModalProps<T> {
    action?: ModalAction;
    setAction?: (action: ModalAction | null) => void;
    refetch?: () => Promise<UseQueryResult<T[], Error>>;

    selectedObject?: (T & ExtraAttributes) | null;
    setSelectedObject?: (selectedObject: T | null) => void;
}