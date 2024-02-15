import React, { ReactNode, useRef, useState } from "react";
import styled, { css, useTheme } from "styled-components";
import { ColorType } from "../../../types/colorTypes";
import { InputStateType, InputType } from "../../../types/formTypes";
import IconWrapper from "../../icons/IconWrapper/IconWrapper";
import ImportantCircle from "../../icons/ImportantCircle/ImportantCircle";
import { P } from "../../typography";

type Props = {
  /** Label of the input field. */
  label?: string;

  /** Small text that will appear under the input field. */
  helperText?: string;

  rows?: number;

  /** Placeholder for the input field */
  placeholder?: string;

  /** Wether the  input field should be disabled */
  disabled?: boolean;

  /** Wether the  input field is active */
  active?: boolean;

  /** Wether the  input field has errors */
  hasError?: boolean;

  /** Wether the  input field is required */
  required?: boolean;

  /** Name of the input field. required for submitting the form */
  name: string;

  /** React hook form register function for error handling */
  register?: any;

  /** The color of the border */
  borderColor?: ColorType;

  /** The maximum amount of characters */
  maxLength?: number;
};

const Wrapper = styled.div<InputStateType>`
  display: flex;
  flex-direction: column;
  cursor: text;

  label {
    margin-bottom: 16px;
    font-weight: 700;
    font-size: 18px;
    line-height: 160%;
    color: #000000;
  }

  > div {
    border: 1px solid;
    background-color: white;
    width: 100%;
    border-radius: 8px;
    display: flex;
    align-items: center;
    padding: 10px 12px 10px 16px;

    textarea {
      border: none;
      width: 100%;
      border-radius: 8px;
      font-weight: 400;
      font-size: 18px;
      line-height: 160%;
      color: #888888;
      background-color: transparent;
      font-family: "Avenir";
      &:focus {
        outline: 0;
      }
      ::placeholder {
        font-family: "Avenir";
        color: #a7a7a7 !important;
      }
    }
  }

  footer {
    display: flex;
    align-items: center;
    margin-top: 13.5px;
  }

  ${({ disabled }) =>
    disabled
      ? css`
          cursor: not-allowed;
          > div {
            opacity: 0.3;
            input {
              cursor: not-allowed;
            }
          }

          footer {
            opacity: 0.3;
          }
        `
      : null}

  ${({ active }) =>
    active
      ? css`
          > div {
            border-color: #black;
          }
        `
      : null}
  
  ${({ hasError }) =>
    hasError
      ? css`
          > div {
            background-color: rgba(255, 51, 51, 0.1);
            border-color: #ff3333;
          }

          footer {
            svg path {
              fill: #ff3333;
            }
            p {
              color: #ff3333;
            }
          }
        `
      : null}
`;

export default function TextArea({
  label,
  helperText,
  placeholder = "Vul hier je reactie in",
  active = false,
  disabled = false,
  hasError = false,
  register,
  required,
  borderColor = "primary",
  name,
  maxLength,
  rows,
  ...rest
}: Props) {
  const [count, setCount] = useState(0);
  const { colors } = useTheme();

  const formRegister = register
    ? register(name, {
        required: required ? "Dit veld is verplicht" : null,
        onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
          if (maxLength) {
            setCount(e.target.value.length);
          }
        },
      })
    : {};

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleInputFocus = () => {
    inputRef?.current?.focus();
  };

  return (
    <Wrapper
      disabled={disabled}
      hasError={hasError}
      active={active}
      onClick={handleInputFocus}
    >
      {(!!label || !!maxLength) && (
        <label className="flex justify-between">
          <span>{!!label && label}</span>
          {!!maxLength && (
            <small className="font-normal ">
              {count} / {maxLength} tekens
            </small>
          )}
        </label>
      )}
      <div style={{ borderColor: colors[borderColor].normal }}>
        <textarea
          rows={rows || 7}
          ref={inputRef}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          {...formRegister}
          {...rest}
        />
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
    </Wrapper>
  );
}
