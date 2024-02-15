import styled from "styled-components";
export const ContainerWrapper = styled.div`
  .MuiContainer-root {
    max-width: 1384px !important;
  }
  .MuiContainer-root {
    max-width: 1141px !important;
  }
  &.volunteer .MuiContainer-root {
    max-width: 1384px !important;
  }
  &.volunteer-training .MuiContainer-root {
    max-width: 1405px !important;
  }
  &.klets-meet .MuiContainer-root {
    max-width: 1384px !important;
  }

  &.volunteer-faq .MuiContainer-root {
    max-width: 1384px !important;
  }
  @media (max-width: 767px) {
    &.volunteer.overvies {
      .title-wrap {
        .title {
          line-height: 118% !important;
        }
        .subtitle {
          font-weight: 400 !important;
        }
      }
    }
  }
`;
