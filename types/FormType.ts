import { Currency } from "./CurrencyTypes";
import { Validation, Visible } from "./Form";

export enum FormType {
  SECTION = "SECTION",
  REPEATABLE_SECTION = "REPEATABLE_SECTION",
}

export enum FormInputType {
  SHORT_TEXT = "SHORT_TEXT",
  LONG_TEXT = "LONG_TEXT",
  RADIO = "RADIO",
  CHECKBOX = "CHECKBOX",
  FILE = "FILE",
  NUMBER = "NUMBER",
  CHIPBOX = "CHIPBOX",
  CURRENCY = "CURRENCY",
}

export enum InputType {
  NUMBER = "NUMBER",
  EMAIL = "EMAIL",
}

export interface ShortText {
  label: String;
  key: String;
  type: FormInputType.SHORT_TEXT;
  required?: Boolean;
  validation?: Validation;
  visible?: Visible;
  placeHolder?: String;
  id?: String;
  description?: String;
  initialValue?: String;
}

export interface LongText {
  label: String;
  key: String;
  type: FormInputType.LONG_TEXT;
  required?: Boolean;
  validation?: Validation;
  visible?: Visible;
  placeHolder?: String;
  id?: String;
  description?: String;
  initialValue?: String;
}

export interface NumberInput {
  label: String;
  key: String;
  type: FormInputType.NUMBER;
  required?: Boolean;
  validation?: Validation;
  visible?: Visible;
  placeHolder?: String;
  id?: String;
  description?: String;
  initialValue?: number;
  min?: number;
  max?: number;
}

export interface FileInput {
  label: String;
  key: String;
  type: FormInputType.FILE;
  required?: Boolean;
  visible?: Visible;
  description?: String;
  initialValue?: Array<File>;
}

// -------------------- Radio ----------------- //

export interface RadioInput {
  label: String;
  key: String;
  type: FormInputType.RADIO;
  options: Array<Option>;
  required?: Boolean;
  validation?: Validation;
  visible?: Visible;
  placeHolder?: String;
  id?: String;
  description?: String;
  initialValue?: String | number;
}

//  -------------- Checkbox -----------------//

export interface CheckboxInput {
  label: String;
  key: String;
  type: FormInputType.CHECKBOX;
  options: Array<Option>;
  required?: Boolean;
  validation?: Validation;
  visible?: Visible;
  placeHolder?: String;
  id?: String;
  description?: String;
  initialValue?: Array<String> | Array<Number>;
}

export interface Option {
  label: String;
  key: String;
  value?: Array<String>;
  description?: String;
}

export interface CurrencyInput {
  label: String;
  key: String;
  type: FormInputType.CURRENCY;
  required?: Boolean;
  validation?: Validation;
  visible?: Visible;
  defaultCurrency?: Currency;
  placeHolder?: String;
  id?: String;
  description?: String;
  initialValue?: {
    currency: Currency;
    value: number;
  };
}

export type FormElement =
  | ShortText
  | LongText
  | NumberInput
  | FileInput
  | RadioInput
  | CheckboxInput
  | CurrencyInput;
