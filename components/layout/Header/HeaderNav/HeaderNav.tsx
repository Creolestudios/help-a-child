import React, { Fragment } from "react";

import ChevronDown from "../../../icons/ChevronDown/ChevronDown";
import ChevronUp from "../../../icons/ChevronUp/ChevronUp";
import HeaderSubmenu from "../HeaderSubmenu/HeaderSubmenu";
import { MENU_COLS } from "../../../../constants/mockData";
import { MenuItem } from "../Header";
import { P } from "../../../typography";
import styled from "styled-components";

type Props = {
  selected?: MenuItem;
  menuCols: MenuItem[];
  onChange: (x: MenuItem) => void;
};

const StyledNav = styled.nav`
  ul {
    display: flex;
    align-items: center;
    li {
      position: relative;
      // min-width: 120px;
      // max-width: 120px;
      display: flex;
      align-items: center;
      margin-right: 52px;
      cursor: pointer;
      svg {
        // position: absolute;
        // right: 0;
      }
      p {
        margin-right: 16px;
      }

      &.selected {
        font-weight: 700;
        p {
          color: black;
        }
      }
    }
  }

  @media ${({ theme }) => theme.devices.laptop} {
  }
`;

export default function HeaderNav({
  selected,
  onChange,
  menuCols = MENU_COLS,
}: Props) {
  return (
    <StyledNav>
      <ul>
        {menuCols.map((menu, index) => (
          <Fragment key={menu.id}>
            {index !== 2 && (
              <li
                className={selected?.id === menu.id ? "selected" : ""}
                onClick={() => onChange(menu)}
              >
                <P>{menu.name}</P>{" "}
                {selected?.id === menu.id ? <ChevronUp /> : <ChevronDown />}
                {selected?.id === menu.id && (
                  <HeaderSubmenu
                    selected={selected?.name}
                    categories={selected?.children}
                  />
                )}
              </li>
            )}
          </Fragment>
        ))}
      </ul>
    </StyledNav>
  );
}
