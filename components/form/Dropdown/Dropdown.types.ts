import { ReactNode } from "react";
import { Control } from "react-hook-form";
import { ColorType } from "../../../types/colorTypes";

export type DropdownItem = {
  /** Name of the dropdown option. */
  name: string;

  /** Value of the dropdown option. */
  value: string;
};

export type DropdownProps = {
  /** Label of the dropdown field. */
  label?: string;

  /** React or custom Icon to be placed in front of the input  */
  iconLeft?: ReactNode;

  fill?: string;
  /** Options that should be used as dropdown options */
  options: DropdownItem[];

  /** Small text that will appear under the dropdown field. */
  helperText?: string;

  /** Placeholder for the dropdown field */
  placeholder?: string;

  /** Wether the dropdown field should be disabled */
  disabled?: boolean;

  /** Wether the dropdown field is active */
  active?: boolean;

  /** Wether the  dropdown field has any error */
  hasError?: boolean;

  /** Wether the  input field is required */
  required?: boolean;

  /** Wether to allow multiselect  */
  multi?: boolean;

  /** Name of the input field. required for submitting the form */
  name: string;

  /** React hook form register function for error handling */
  register?: any;
  labelClass?: string;
  control?: Control<any>;

  /** The color of the border */
  borderColor?: ColorType;

  /** Event called when the dropdown changes */
  onChange?: (x: string) => void;
};
