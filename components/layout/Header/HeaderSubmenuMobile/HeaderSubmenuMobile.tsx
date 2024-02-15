import React, { useState } from "react";

import ChevronDown from "../../../icons/ChevronDown/ChevronDown";
import ChevronUp from "../../../icons/ChevronUp/ChevronUp";
import Link from "next/link";
import { MENU_COLS } from "../../../../constants/mockData";
import { MenuItem } from "../Header";
import { P } from "../../../typography";
import styled from "styled-components";

type Props = {
  selected?: MenuItem;
  menuCols: MenuItem[];
  onChange: (x: MenuItem) => void;
};

const Wrapper = styled.div`
  flex: 1;
  padding: 32px;
  background-color: white;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  border-radius: 8px;
  position: absolute;
  top: 10px;

  position: absolute;
  top: calc(100% + 5px);
  z-index: 999;
  right: 5px;
  width: calc(100% - 10px);

  ul {
    list-style: none;
    padding: 0;
    width: 100%;
  }

  > ul {
    > li {
      padding: 12px 0;
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          margin: 0;
        }
      }

      &.with-divider {
        border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
      }
    }

    .items {
      max-height: 1px;
      overflow: hidden;
      transition: 0.3s ease-in-out;
    }

    .selected {
      .header p {
        color: ${({ theme }) => theme.colors.primary.normal};
      }
      .items {
        max-height: 100% !important;
      }
    }
  }
`;

export default function HeaderSubmenuMobile({
  selected,
  onChange,
  menuCols = MENU_COLS,
}: Props) {
  const generateColClass = (
    currentId: string,
    index: number,
    selectedId?: string
  ) => {
    let className = "";

    if (selectedId === currentId) className = `${className} selected`;
    if (index < menuCols.length - 1) className = `${className} with-divider`;

    return className;
  };
  return (
    <Wrapper id="header-submenu-mobile">
      <ul>
        {menuCols.map((menu, index) => (
          <li
            key={menu.id}
            className={generateColClass(menu.id, index, selected?.id)}
            onClick={() => onChange(menu)}
          >
            <div className="header">
              <P variant="bold" className="mr-2">
                {menu.name}
              </P>{" "}
              {selected?.id === menu.id ? <ChevronUp /> : <ChevronDown />}
            </div>
            <ul key={index} className="items">
              {menu.children.map((category, index) => {
                if (category.status === "published") {
                  return (
                    <>
                      {category.children
                        .filter((items) => items.status === "published")
                        .map((item) => (
                          <li key={item.link}>
                            <P>
                              <Link href={item.link}>{item.name}</Link>
                            </P>
                          </li>
                        ))}
                    </>
                  );
                }
                return;
              })}
            </ul>
          </li>
        ))}
      </ul>
    </Wrapper>
  );
}
