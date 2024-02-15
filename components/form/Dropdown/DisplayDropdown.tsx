import React, { useRef, useState } from "react";
import styled, { useTheme } from "styled-components";

import ChevronDown from "../../icons/ChevronDown/ChevronDown";
import ChevronUp from "../../icons/ChevronUp/ChevronUp";

export type DropdownItem = {
  /** Name of the dropdown option. */
  name: string;

  /** Value of the dropdown option. */
  value: string;
};

export type Props = {
  /** Options that should be used as dropdown options */
  options: DropdownItem[];

  /** Placeholder for the dropdown field */
  placeholder?: string;
};

const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  cursor: pointer;

  select {
    position: absolute;
    left: -999999px;
  }

  .inner {
    position: relative;
    z-index: 1;

    .selectBox {
      cursor: pointer;
      display: flex;
      align-items: center;

      span {
        color: ${({ theme }) => theme.colors.primary.normal};
        font-weight: 700;
        font-size: ${({ theme }) => theme.fontSizes.h1.mobile};
        line-height: 140%;
        text-align: center;
        margin-right: 16px;
      }

      svg {
        path {
          stroke: ${({ theme }) => theme.colors.info.normal};
        }
      }

      &.open {
        border-radius: 8px 8px 0 0;
      }
    }

    .selectItems {
      position: absolute;
      z-index: 999999;
      left: 0;
      top: 100%;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      background-color: ${({ theme }) => theme.colors.white};
      padding: 12.5px 16px;
      box-shadow: ${({ theme }) => theme.shadows.sm};
      transform: translateY(11px);

      button {
        font-weight: 700;
        font-size: 32px;
        line-height: 120%;
        border: none;
        outline: 0;
        background-color: ${({ theme }) => theme.colors.white};
        z-index: 999;
        padding: 14px 42px;
        position: relative;
        color: #000000;

        &:hover,
        &.active {
          background-color: ${({ theme }) => theme.colors.primary.normal};
          color: white;
          border-radius: 8px;
        }
      }

      &:before {
        content: "";
        width: 18px;
        height: 18px;
        position: absolute;
        z-index: 3;
        border-radius: 4px;

        top: 0;
        left: 0;
        transform: translate(20.78px, -50%) rotate(45deg);
        transform-origin: center;
        background-color: ${({ theme }) => theme.colors.white};
        box-shadow: ${({ theme }) => theme.shadows.sm};
      }
      &::after {
        content: "";
        width: 100px;
        height: 16px;
        position: absolute;
        z-index: 4;
        border-radius: 8px;
        top: 0;
        left: 0;
        transform-origin: center;
        background-color: ${({ theme }) => theme.colors.white};
      }
    }
  }

  @media ${({ theme }) => theme.breakpoints.tablet} {
    .inner {
      .selectBox {
        span {
          font-size: ${({ theme }) => theme.fontSizes.h1.desktop};
        }
      }
    }
  }
`;

export default function DisplayDropdown({
  options,
  placeholder = "Select",
  ...rest
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<DropdownItem | null>(null);
  const inputRef = useRef<HTMLSelectElement>(null);

  const handleInputFocus = () => {
    inputRef?.current?.focus();
  };

  const handleSelect = (option: DropdownItem) => {
    setSelected(option);
    setIsOpen(() => false);
  };

  return (
    <Wrapper onClick={handleInputFocus}>
      <div className="inner">
        <select
          ref={inputRef}
          placeholder={placeholder}
          onFocus={() => setIsOpen(() => true)}
          onBlur={() => setIsOpen(() => false)}
          {...rest}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        <div className={`selectBox ${isOpen ? "open" : ""}`}>
          <span className="font-heading">{selected?.name ?? placeholder}</span>
          {!isOpen ? <ChevronDown /> : <ChevronUp />}
        </div>
        {isOpen && (
          <div className="selectItems">
            {options.map((option) => (
              <button
                className={selected?.value === option.value ? "active" : ""}
                key={option.value}
                onClick={() => handleSelect(option)}
              >
                {option.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </Wrapper>
  );
}
