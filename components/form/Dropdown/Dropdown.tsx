import React, { useRef, useState } from "react";
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

export default function Dropdown({
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
  onChange,
  placeholder = "Kies een optie",
  hasError = false,
  borderColor = "primary",
  multi = false,
  ...rest
}: DropdownProps) {
  const inputRef = useRef<HTMLSelectElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { colors } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSingle, setSelectedSingle] = useState<DropdownItem | null>(
    null
  );
  const [selectedMulti, setSelectedMulti] = useState<DropdownItem[]>([]);

  const formRegister = register
    ? register(name, {
        required: required ? "Dit veld is verplicht" : null,
      })
    : {};

  const handleInputFocus = () => {
    inputRef?.current?.focus();
  };

  const handleOptionClick = (option: DropdownItem) => {
    if (!multi) {
      handleSelect(option);
      return;
    }

    handleAddSelectMulti(option);
  };

  const handleSelect = (option: DropdownItem) => {
    setSelectedSingle(option);

    if (formRegister) {
      formRegister?.onChange?.({ target: { name, value: option.value } });
    }

    if (onChange) onChange(option.value);
    setIsOpen(() => false);
  };

  const handleAddSelectMulti = (option: DropdownItem) => {
    let selectList = [...selectedMulti];
    const found = selectList.filter((item) => item.value === option.value);

    if (found[0]) {
      selectList = selectList.filter((item) => item.value !== option.value);
    } else {
      selectList.push(option);
    }

    if (formRegister) {
      formRegister?.onChange?.({
        target: {
          name,
          value: selectList.map((item) => item.value),
        },
      });
    }

    if (onChange) onChange(option.value);
    setSelectedMulti(selectList);
  };

  const handleRemoveItem = (id: string) => {
    let selectList = [...selectedMulti].filter((item) => item.value !== id);

    setSelectedMulti(selectList);
  };

  const generateOptionActiveStyle = (option: DropdownItem) => {
    const found = selectedMulti.filter((item) => item.value === option.value);

    if (multi && found[0]) {
      return {
        backgroundColor: colors.primary.normal,
      } as React.CSSProperties;
    }

    return {};
  };

  // useOnClickOutsideEl(wrapperRef, () => {
  //   setSelectedSingle(selectedSingle);
  //   setIsOpen(false);
  // });

  return (
    <DropdownWrapper
      hasError={hasError}
      onClick={handleInputFocus}
      ref={wrapperRef}
    >
      {!!label && (
        <label
          style={{ fontFamily: "Avenir" }}
          className={`${labelClass} text-[#fff]`}
        >
          {label}
        </label>
      )}
      <div>
        <select
          multiple={multi}
          ref={inputRef}
          placeholder={placeholder}
          disabled={disabled}
          onBlur={() => setIsOpen(() => false)}
          {...formRegister}
          {...rest}
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
            {!multi ? (
              <span style={{ fontFamily: "Avenir" }}>
                {selectedSingle?.name || placeholder}
              </span>
            ) : (
              <span style={{ fontFamily: "Avenir" }}>{placeholder}</span>
            )}
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
                onClick={() => handleOptionClick(option)}
              >
                {option.name}
              </button>
            ))}
          </div>
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
      {selectedMulti.length > 0 && (
        <div className="flex flex-wrap gap-[8px] mt-[16px]">
          {selectedMulti.map((item, index) => (
            <Tag
              key={index}
              size="m"
              onClick={() => handleRemoveItem(item.value)}
            >
              {item.name}
            </Tag>
          ))}
        </div>
      )}
    </DropdownWrapper>
  );
}
