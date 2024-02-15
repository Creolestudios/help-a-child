import { Container } from "@mui/system";
import React, { ReactNode } from "react";
import { Tag as TagType } from "../../../types/content-types/Tag.type";
import styled from "styled-components";
import { useHorizontalScrollHints } from "../../../utils/scroll";
import SearchBar from "./SearchBar";

type Props = {
  value?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  onSearch?: (tag: string) => void;
};

const Wrapper = styled.div`
  background-color: #ebfffc;
  display: flex;
  border-radius: 8px;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;

  .outer {
    position: relative;
    overflow: hidden;
    padding: 24px 0;
    width: 100%;

    .inner {
      width: 100%;
      input {
        width: 100%;
      }
    }
  }
  @media (max-width: 767px) {
    flex-direction: column;
    padding: 0 16px;
    .hand-icon {
      transform: rotate(90deg);
      display: inline-block;
    }
    .outer {
      padding: 0 16px 36px 16px;
    }
  }
`;

export default function SearchBarWrapper({
  prefix,
  suffix,
  value,
  onSearch,
}: Props) {
  return (
    <Container maxWidth="xl" style={{ margin: "21px auto" }}>
      <Wrapper>
        {prefix && (
          <div className="pt-[16px] md:p-[32px] md:blocK flex">{prefix}</div>
        )}
        <div className="outer flex-1">
          <div className="inner scrolling-right">
            <SearchBar />
          </div>
        </div>
        {suffix && (
          <div style={{ display: "block", paddingLeft: 20 }}>{suffix}</div>
        )}
      </Wrapper>
    </Container>
  );
}
