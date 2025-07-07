import ModalAction from "@/lib/enums/modalAction";
import { BaseModalProps } from "@/lib/interfaces/BaseModalProps";
import ExtraAttributes from "@/lib/interfaces/ExtraAttributesProps";
import { UseQueryResult } from "@tanstack/react-query";
import { cloneElement, isValidElement, ReactElement } from "react";


interface ToolkitModalProps<T> {
  action?: ModalAction;
  setAction?: (action: ModalAction | null) => void;

  selectedObject?: T;
  setSelectedObject?: (selectedObject: T | null) => void;

  refetch: () => Promise<UseQueryResult<T[], Error>>;

  ordidaryModal?: ReactElement<BaseModalProps<T>>;
  listModal?: ReactElement<BaseModalProps<T>>;
  confirmModal?: ReactElement<BaseModalProps<T>>;
}

export default function ToolkitModal<T>(props: ToolkitModalProps<T>) {
  const injectProps = (modal: ReactElement<BaseModalProps<T>>) => {
    if (isValidElement(modal)) {
      return cloneElement(modal, {
        selectedObject: props.selectedObject as T & ExtraAttributes,
        setSelectedObject: props.setSelectedObject,
        action: props.action,
        setAction: props.setAction,
        refetch: props.refetch,
        ...modal.props,
      });
    }
    return modal;
  };
  if (
    props.action == ModalAction.Create ||
    props.action == ModalAction.Update
  ) {
    return injectProps(props.ordidaryModal!);
  } else if (props.action == ModalAction.Delete) {
    return injectProps(props.confirmModal!);
  } else {
    return injectProps(props.listModal!);
  }
}
