import React from "react";

// Redux
import { useSelector } from "react-redux";
import { selectForm } from "../store/states/formSlice";

// Services
import FormService from "../services/form.service";

// Types
import {
  ExportableFormState,
  FormBuilder,
  KeyStore,
  RepeatableSection,
  Section,
  ValidationStore,
} from "../types/Form";
import { FormElement } from "../types/FormType";

function useExportableFormData({ formKey }: { formKey: string }) {
  const FS = new FormService();
  const FormContext = useSelector(selectForm);

  const [exportableFormState, setExportableFormState] =
    React.useState<ExportableFormState>({});

  const exportFormData = () => {
    let exportData: ExportableFormState = {};
    if (!FormContext[formKey]) return;
    const keyStoreSnapshot: KeyStore = { ...FormContext[formKey].keyStore };
    const formStateSnapshot: Array<Section | RepeatableSection | FormElement> =
      [...FormContext[formKey].formBuilderSchema.sections];

    formStateSnapshot.forEach((element) => {
      exportData[element.key as string] = {};
      FS.recursiveExporter(keyStoreSnapshot, element, exportData, "");
    });

    setExportableFormState(exportData);
  };

  const checkValidated = (): boolean => {
    const validationStore: ValidationStore =
      FormContext[formKey].validationStore;
    let valid = true;
    for (let key in validationStore) {
      if (!validationStore[key]) {
        valid = false;
        break;
      }
    }

    return valid;
  };

  const exportableFormView = () => {
    let exportData: ExportableFormState = {};
    if (!FormContext[formKey]) return;
    const keyStoreSnapshot: KeyStore = { ...FormContext[formKey].keyStore };
    const formStateSnapshot: Array<Section | RepeatableSection | FormElement> =
      [...FormContext[formKey].formBuilderSchema.sections];

    formStateSnapshot.forEach((element) => {
      exportData[element.key as string] = {};
      FS.recursiveViewConverter(keyStoreSnapshot, element, exportData, "");
    });

    return exportData;
  };

  React.useEffect(() => {
    exportFormData();
  }, [FormContext[formKey]]);

  return { exportableFormState, exportableFormView, checkValidated };
}

export default useExportableFormData;
