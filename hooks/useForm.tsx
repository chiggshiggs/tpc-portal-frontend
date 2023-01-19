"use client";

import React, { ReactElement, Fragment, useState, useEffect } from "react";
import ValidationService from "../services/validation.service";

// Types
import { Failure, FormBuilder, Success } from "../types/Form";
import { Validation } from "../types/Validation";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  selectForm,
  updateFormStateContext,
  updateFormValidationContext,
} from "../store/states/formSlice";
import { FormElement, FormInputType, FormType } from "../types/FormType";

function useForm({
  formElement,
  basePath,
  formKey,
  formBuilderSchema,
}: {
  formElement: FormElement;
  basePath: string;
  formKey: string;
  formBuilderSchema: FormBuilder;
}) {
  const dispatch = useDispatch();
  const ReduxFormContext = useSelector(selectForm);

  // Services
  const vs = new ValidationService();

  // State
  const [error, setError] = useState<String>("");
  const [blur, setBlur] = useState<Boolean>(false);
  const [keyDown, setKeyDown] = useState<Boolean>(false);
  const [visible, setVisible] = useState<Boolean>(true);

  // Initialize Key Value and Validation
  useEffect(() => {
    // if (!ReduxFormContext[formKey].keyStore[basePath])
    switch (formElement.type) {
      case FormInputType.CHECKBOX:
        dispatch(
          updateFormStateContext({
            formKey,
            stateKey: basePath,
            value: (formElement.initialValue as string[]) || [],
            formBuilderSchema,
          })
        );
        break;

      // For currency we need to concat the currency and the value for initial value
      case FormInputType.CURRENCY:
        let currencyValue = "INR";
        if (formElement.initialValue)
          currencyValue =
            formElement.initialValue.currency + formElement.initialValue.value;
        dispatch(
          updateFormStateContext({
            formKey,
            stateKey: basePath,
            value: currencyValue,
            formBuilderSchema,
          })
        );
        break;

      default:
        dispatch(
          updateFormStateContext({
            formKey,
            stateKey: basePath,
            value: (formElement.initialValue as string) || ("" as string),
            formBuilderSchema,
          })
        );
    }

    // Updating the Validation state
    dispatch(
      updateFormValidationContext({
        formKey,
        stateKey: basePath,
        value:
          formElement.type !== FormInputType.FILE &&
          (formElement.required || formElement.validation)
            ? false
            : true,
        formBuilderSchema,
      })
    );
  }, []);

  const populate = (propsList: Array<string>) => {
    let populateValues: Array<String> = [];
    propsList.forEach((prop) => {
      if (prop === "SELF")
        populateValues.push(ReduxFormContext[formKey]?.keyStore[basePath]);
      else populateValues.push(ReduxFormContext[formKey]?.keyStore[prop]);
    });
    return populateValues;
  };

  // Validate
  useEffect(() => {
    if (formElement.type === FormInputType.FILE) return;
    const inputState = ReduxFormContext[formKey]?.keyStore[basePath];
    if (!ReduxFormContext[formKey]?.submitTried && !keyDown && !blur) return;

    let finalValidatedState: boolean = true;

    // Generic Required Validation
    if (
      formElement.required &&
      vs.isRequired(inputState, formElement.type).validationStatus ===
        Validation.FAILURE
    ) {
      finalValidatedState = false;
      console.log(inputState, basePath);
      setError("This field is required");
    } else {
      setError("");
      if (!formElement.validation) return;
      let populateValues: Array<String> = populate(
        formElement.validation.props as Array<string>
      );

      let state: Success | Failure | undefined =
        formElement.validation?.validator(populateValues);
      setError(
        (state?.validationStatus == Validation.SUCCESS
          ? ""
          : state?.errorMessage) || ""
      );
      if (state?.validationStatus == Validation.FAILURE)
        finalValidatedState = false;
    }

    // Update the validation Status on validation Store
    dispatch(
      updateFormValidationContext({
        formKey,
        stateKey: basePath,
        value: finalValidatedState,
        formBuilderSchema,
      })
    );
  }, [keyDown, blur, ReduxFormContext[formKey]]);

  // Visibility
  useEffect(() => {
    if (!formElement.visible) return;
    let populateValues = populate(formElement.visible.props as Array<string>);
    let state: Boolean | undefined =
      formElement.visible?.validator(populateValues);
    setVisible(state || false);
  }, [ReduxFormContext[formKey]]);

  const captureTextInputChange = (e: React.SyntheticEvent): string => {
    const target = e.target as HTMLInputElement;
    dispatch(
      updateFormStateContext({
        formKey,
        stateKey: basePath,
        value: target.value,
        formBuilderSchema,
      })
    );
    return target.value;
  };

  const captureNumberInputChange = (
    value: number | undefined
  ): number | undefined => {
    dispatch(
      updateFormStateContext({
        formKey,
        stateKey: basePath,
        value,
        formBuilderSchema,
      })
    );
    return value;
  };

  const captureCurrencyInputChange = (value: string): string => {
    dispatch(
      updateFormStateContext({
        formKey,
        stateKey: basePath,
        value,
        formBuilderSchema,
      })
    );
    return value;
  };

  const captureCheckboxInputChange = (value: Array<string>): Array<string> => {
    dispatch(
      updateFormStateContext({
        formKey,
        stateKey: basePath,
        value,
        formBuilderSchema,
      })
    );
    return value;
  };

  const captureRadioInput = (input: string): string => {
    dispatch(
      updateFormStateContext({
        formKey,
        stateKey: basePath,
        value: input,
        formBuilderSchema,
      })
    );
    return input;
  };

  return {
    inputState: ReduxFormContext[formKey]?.keyStore[basePath],
    captureCheckboxInputChange,
    captureTextInputChange,
    captureNumberInputChange,
    error,
    visible,
    blur,
    setBlur,
    keyDown,
    setKeyDown,
    captureRadioInput,
    captureCurrencyInputChange,
  };
}

export default useForm;
