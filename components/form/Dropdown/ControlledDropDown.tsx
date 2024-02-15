import React, { useState } from "react";
import { useTheme } from "styled-components";

import ChevronDownFilled from "../../icons/ChevronDownFilled/ChevronDownFilled";
import ChevronUpFilled from "../../icons/ChevronUpFilled/ChevronUpFilled";
import IconWrapper from "../../icons/IconWrapper/IconWrapper";
import ImportantCircle from "../../icons/ImportantCircle/ImportantCircle";
import { P } from "../../typography";
import Tag from "../../buttons/Tag/Tag";
import { useOnClickOutsideEl } from "../../../utils/eventHandlers";
import { DropdownWrapper } from "./Dropdown.styled";
import { DropdownItem, DropdownProps } from "./Dropdown.types";
import ChevronDown from "../../icons/ChevronDown/ChevronDown";
import ChevronUp from "../../icons/ChevronUp/ChevronUp";

export default function ControlledDropDown({
  iconLeft,
  options,
  label,
  disabled,
  helperText,
  fill,
  labelClass,
  register,
  name,
  required,
  setValue,
  onChange,
  placeholder = "Kies een optie",
  hasError = false,
  borderColor = "primary",
  multi = false,
  field,
  watch,
  clearErrors,
}: DropdownProps & {
  value: any;
  field: any;
  watch: any;
  setValue: any;
  clearErrors?: any;
}) {
  const { colors } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const selectedValue = watch(name);

  const [selectedSingle, setSelectedSingle] = useState<any>(null);
  const handleSelect = (selectedValue: string) => {
    setValue(name, selectedValue);
    setIsOpen(false);
  };

  const generateOptionActiveStyle = (option: DropdownItem) => {
    const found = options.filter((item) => item.value === selectedValue);
    return {};
  };

  return (
    <DropdownWrapper hasError={hasError}>
      {!!label && (
        <label
          style={{ fontFamily: "Avenir" }}
          className={`${labelClass} text-[#fff]`}
        >
          {label}
        </label>
      )}

      <select
        value={selectedValue}
        onChange={(e) => {
          field.onChange(e);
          setValue(name, e.target.value);
        }}
        onBlur={() => {
          field.onBlur();
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>

      <div
        className={`selectBox ${isOpen ? "open" : ""}`}
        style={{
          borderColor: colors[borderColor].normal,
          fontFamily: "Avenir",
        }}
        onClick={() => setIsOpen((state) => !state)}
      >
        <div className="flex items-center" style={{ fontFamily: "Avenir" }}>
          {!!iconLeft && (
            <IconWrapper style={{ marginRight: 10 }}>{iconLeft}</IconWrapper>
          )}

          <span style={{ fontFamily: "Avenir" }}>
            {selectedSingle?.name || placeholder}
          </span>
        </div>
        <span>
          {!isOpen ? (
            <ChevronDownFilled color={borderColor} fill={fill} />
          ) : (
            <ChevronUpFilled color={borderColor} />
          )}
        </span>
      </div>
      {isOpen && (
        <div
          className="selectItems"
          style={{ borderColor: colors[borderColor].normal }}
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              style={generateOptionActiveStyle(option)}
              onClick={() => {
                clearErrors && clearErrors([name]);
                setSelectedSingle(option);
                handleSelect(option.value);
                setValue(name, option.value);
              }}
            >
              {option.name}
            </button>
          ))}
        </div>
      )}

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
    </DropdownWrapper>
  );
}
