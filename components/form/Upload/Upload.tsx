import { InputStateType } from "../../../types/formTypes";
import React, { ChangeEvent, ReactNode } from "react";
import styled, { css, useTheme } from "styled-components";

import IconWrapper from "../../icons/IconWrapper/IconWrapper";
import ImportantCircle from "../../icons/ImportantCircle/ImportantCircle";
import { P } from "../../typography";
import { ColorType } from "../../../types/colorTypes";

type Props = {
  /** Label of the input field. */
  label?: string;

  /** React or custom Icon to be placed in front of the input  */
  iconLeft?: ReactNode;

  /** React or custom Icon to be placed after the input  */
  iconRight?: ReactNode;

  /** Small text that will appear under the input field. */
  helperText?: string;

  /** Placeholder for the input field */
  placeholder?: string;

  /** Whether the input field should be disabled */
  disabled?: boolean;

  /** Whether the input field is active */
  active?: boolean;

  /** Whether the input field is required */
  required?: boolean;

  /** Whether the input field has errors */
  hasError?: boolean;

  /** Name of the input field. Required for submitting the form */
  name?: string;

  defaultValue?: string;

  /** Callback to handle the input */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;

  /** The color of the border */
  borderColor?: ColorType;
};

const InputWrapper = styled.div<InputStateType>`
  label {
    margin-bottom: 16px;
    font-weight: 700;
    font-size: 18px;
    line-height: 160%;
    color: #fff;
  }
  .upload-button-dz {
    background: #fff;
    font-family: "Avenir";
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 160%;
    color: #c7c7c7;
    padding: 10px;
    border-radius: 8px;
    text-align: center;
    > input {
      width: 100%;
      opacity: 0;
      position: absolute;
      left: 0;
    }
  }
`;

export default function Upload({
  iconLeft,
  iconRight,
  label,
  helperText,
  placeholder = "Select file",
  active = false,
  disabled = false,
  hasError = false,
  defaultValue = "",
  name,
  onChange,
  required,
  borderColor = "primary",
  ...rest
}: Props) {
  const { colors } = useTheme();

  return (
    <InputWrapper disabled={disabled} active={active} hasError={hasError}>
      {!!label && <label>{label}</label>}
      <div
        style={{ borderColor: colors[borderColor].normal }}
        className="mt-[16px]"
      >
        {!!iconLeft && (
          <IconWrapper style={{ marginRight: 10 }}>{iconLeft}</IconWrapper>
        )}
        <div className="upload-button-dz">
          Upload een afbeelding
          <input
            type="file"
            placeholder={placeholder}
            onChange={onChange}
            defaultValue={defaultValue}
            name={name}
            required={required}
            {...rest}
          />
        </div>
        {!!iconRight && (
          <IconWrapper style={{ marginLeft: 10 }}>{iconRight}</IconWrapper>
        )}
      </div>

      {!!helperText && (
        <footer>
          <IconWrapper style={{ marginRight: 16 }}>
            <ImportantCircle />
          </IconWrapper>
          <P variant="helper" style={{ margin: 0 }}>
            {helperText}
          </P>
        </footer>
      )}
    </InputWrapper>
  );
}
