import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import styled from "styled-components";
import { P } from "../../typography";
import SearchBar from "../SearchBar/SearchBar";

type Props = {
  quote?: string;
  searchLabel?: string;
  onSearch: (x: string) => void;
};

const StyledWrapper = styled.div`
  padding: 15px 0;
  background-color: ${({ theme }) => theme.colors.secondary.normal};

  p {
    color: ${({ theme }) => theme.colors.white.normal};
  }

  .search-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      width: 100%;
    }
    > div {
      margin-left: 0;
      width: 100%;
    }
  }

  @media ${({ theme }) => theme.devices.laptop} {
    .search-wrapper {
      p {
        width: initial;
      }

      > div {
        /* margin-left: 12px; */
      }
    }
  }
`;

export default function CollectionSearchBar({
  quote = "Je bent sterk. Sterker dan je ooit had gedacht. Sterker dan de sterkste book. Oneindig is jouw kracht.",
  searchLabel = "Doorzoek het forum",
  onSearch,
}: Props) {
  return (
    <StyledWrapper>
      <Container>
        <Grid container className="flex items-center justify-between flex-wrap">
          {/* <Grid item xs={12} md={8}>
            <P variant="italic" style={{ fontWeight: 300 }}>
              <q>{quote}</q>
            </P>
          </Grid> */}
          <Grid item xs={12} className="search-wrapper">
            <SearchBar
              iconColor="secondary"
              placeholder={searchLabel}
              onSearch={onSearch}
            />
          </Grid>
        </Grid>
      </Container>
    </StyledWrapper>
  );
}
