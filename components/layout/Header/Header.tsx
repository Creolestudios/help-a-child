import React, { useEffect, useRef, useState } from "react";

import CloseIcon from "../../icons/CloseIcon/CloseIcon";
import { ContentStatus } from "../../../types/content-types/Status.type";
import HeaderNav from "./HeaderNav/HeaderNav";
import HeaderSubmenuMobile from "./HeaderSubmenuMobile/HeaderSubmenuMobile";
import Link from "next/link";
import Logo from "../../icons/Logo/Logo";
import MenuIcon from "../../icons/MenuIcon/MenuIcon";
import SearchBar from "../../form/SearchBar/SearchBar";
import SearchIcon from "../../icons/SearchIcon/SearchIcon";
import { getMenuItems } from "../../../utils/api";
import styled from "styled-components";
import { useOnClickOutsideEl } from "../../../utils/eventHandlers";

export type MenuItem = {
  id: string;
  name: string;
  status?: ContentStatus;
  children: ChildMenuItem[];
};

export type ChildMenuItem = {
  id: string;
  name: string;
  status?: ContentStatus;
  children: GrandChildMenuItem[];
};

export type GrandChildMenuItem = {
  id: string;
  name: string;
  status?: ContentStatus;
  link: string;
};

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.colors.white.normal};
  z-index: 500;
  .inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 41px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);

    > div {
      display: flex;
      align-items: center;
      background-color: white;
      gap: 52px;
    }
  }

  .mobile-menu {
    display: block;
    width: 100%;
  }

  .desktop-menu {
    display: none;
    .inner + div {
      width: 100%;
    }
  }
  @media ${({ theme }) => theme.devices.laptop} {
    .mobile-menu {
      display: none;
    }
    .desktop-menu {
      display: block;
    }
  }
`;

export default function Header() {
  const [isLoading, setIsLoading] = useState(true);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selected, setSelected] = useState<MenuItem | undefined>(undefined);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const elRef = useRef(null);

  useOnClickOutsideEl(elRef, () => {
    setSelected(undefined);
    setMobileMenuOpen(false);
  });

  const toggleMenu = (menu: MenuItem) => {
    if (selected?.id === menu.id) {
      return setSelected(() => undefined);
    }

    return setSelected(() => menu);
  };

  useEffect(() => {
    const getData = async () => {
      const data = await getMenuItems();

      if (data) {
        const sortedArray = [...data].sort(
          (a, b) => b.children.length - a.children.length
        );

        setMenuItems(sortedArray);
      }
      setIsLoading(false);
    };

    if (menuItems.length === 0 && isLoading) {
      getData();
    }
  }, [isLoading, menuItems]);
  return (
    <StyledHeader ref={elRef}>
      <div className="desktop-menu new-menu">
        <div className="inner">
          <div>
            <Link href="/">
              <Logo />
            </Link>
            {!isLoading && (
              <HeaderNav
                menuCols={menuItems}
                selected={selected}
                onChange={(x) => toggleMenu(x)}
              />
            )}
          </div>
          <div>
            <SearchBar />
          </div>
        </div>
        {/* {selected && selected?.children.length > 0 && (
          <HeaderSubmenu
            selected={selected?.name}
            categories={selected?.children}
          />
        )} */}
      </div>
      <div className="mobile-menu">
        <div className="inner">
          <div>
            <Link href="/">
              <Logo />
            </Link>
          </div>
          <div>
            {!isLoading && (
              <div className="flex items-center gap-[24px]">
                <Link href="/zoeken">
                  <SearchIcon />
                </Link>
                <button
                  style={{ border: "none", backgroundColor: "white" }}
                  onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
                >
                  {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                </button>
              </div>
            )}
          </div>
        </div>
        {mobileMenuOpen && (
          <HeaderSubmenuMobile
            menuCols={menuItems}
            selected={selected}
            onChange={(x) => toggleMenu(x)}
          />
        )}
      </div>
    </StyledHeader>
  );
}
