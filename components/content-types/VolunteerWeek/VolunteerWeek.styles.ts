import styled from "styled-components";

export const VolunteerWrapper = styled.div`
  position: relative;
  min-width: 200px;
  width: 100%;
  max-width: 340px;
  min-height: 150px;
  background: #ffecf1;
  .week-title {
    font-size: 26px !important;
  }
  ul li > div {
    margin: 8px 0;
  }
  @media (max-width: 1199px) {
    min-width: 150px;
    max-width: 300px;
    padding: 20px !important;
  }
  @media (max-width: 991px) {
    max-width: 250px;
    padding: 15px !important;

    .input-box {
      font-size: 14px;
    }
    li > div > div {
      padding: 8px 10px;
    }
  }

  @media (max-width: 800px) {
    max-width: 235px;
  }
  @media (max-width: 767px) {
    max-width: 100%;
    margin: 20px 0 !important;
    padding: 25px 20px !important;
  }
  &.active {
    .circle {
      /* position: relative; */
      z-index: 2;
      &::after {
        content: "";
        position: absolute;
        left: -28px;
        top: 8px;
        width: 150px;
        height: 5px;
        background: #fe517e;
        z-index: 1;
      }
      &::before {
        content: "";
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #fff;
        display: flex;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        position: absolute;
        z-index: 2;
      }
    }
  }
  &.bottom.active {
    .circle {
      &::after {
        top: 9px;
      }
    }
  }
  .line {
    position: absolute;
    top: 100%;
    left: 70px;
    height: 100px;
    width: 4px;
    background: #fe517e;
  }
  .circle {
    position: absolute;
    bottom: -103px;
    left: 63px;
    height: 20px;
    width: 20px;
    background: #fe517e;
    border-radius: 50%;
  }
  ul li {
    .list-item {
      padding-left: 25px;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 8px;
        border: none;
        border-left: 2px solid #000;
        border-bottom: 2px solid #000;
        width: 15px;
        height: 8px;
        transform: rotate(-45deg);
      }
    }
  }
  .active {
    ul li:before {
      border: none;
    }
  }
  &.bottom {
    .line {
      bottom: 100%;
      top: unset;
    }
    .circle {
      top: -106px;
      bottom: unset;
    }
  }
`;
