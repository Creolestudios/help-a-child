import styled, { css } from "styled-components";

export const DropdownWrapper = styled.div<{ hasError: boolean }>`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  position: relative;

  select {
    position: absolute;
    left: -999999px;
  }

  label {
    margin-bottom: 16px;

    font-weight: 700;
    font-size: 18px;
    line-height: 160%;
    color: #000000;
  }

  .selectBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid;
    background-color: white;
    width: 100%;
    border-radius: 8px;

    display: flex;
    align-items: center;
    padding: 10px 16px;

    span {
      font-weight: 400;
      font-size: 18px;
      line-height: 160%;
      color: #a7a7a7;
    }

    &.open {
      border-radius: 8px 8px 0 0;
    }
  }

  .selectItems {
    border: 1px solid;
    border-top-width: 0;
    background-color: white;
    width: 100%;
    border-radius: 0 0 8px 8px;
    position: absolute;
    z-index: 999;
    display: flex;
    flex-direction: column;
    padding: 6.18px 0 10px 0;

    button {
      font-weight: 400;
      font-size: 18px;
      line-height: 160%;
      width: 100%;
      border: none;
      outline: 0;
      text-align: left;
      background-color: white;
      padding: 0;
      padding: 0 16px;

      color: #000000;

      &:hover {
        background-color: ${({ theme }) => theme.colors.primary.normal};
        color: ${({ theme }) => theme.colors.white};
      }
    }
  }

  footer {
    display: flex;
    align-items: center;
    margin-top: 13.5px;
  }

  ${({ hasError }) =>
    hasError
      ? css`
          .selectBox {
            border: 2px solid #ff3333 !important;
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
