import styled from "styled-components";

export const StyledForm = styled.div`
  &:before {
    content: " ";
    display: block;
    position: absolute;
    left: 0;
    top: 0px;
    width: 100%;
    height: 100%;
    opacity: 0.25;
    background: url("/chatBg.png");
    // background-size: cover;
    // background-repeat: no-repeat;
    /* background-position: center center; */
    background-size: 45%;
    background-position: left 225px top -75px;
    z-index: 1;
  }
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: rgba(255, 151, 29, 1);
  border-radius: 8px;
  padding: 32px;
  label {
    font-family: "Avenir";
    font-style: normal;
    font-weight: 800;
    font-size: 18px;
    line-height: 160%;
    color: #fff !important;
  }
  .forum_act {
    color: #ff971d !important;
  }
  form {
    position: relative;
    z-index: 2;
    div,
    .selectBox {
      border: none;
    }
  }

  @media (max-width: 768px) {
    padding: 24px !important;
    &:before {
      background-size: 135%;
      background-position: left -108px top 8px;
    }
    form > div > div {
      padding: 14px 0 !important;
    }
    .form-wrapper {
      margin: auto !important;
      width: inherit;
    }
    label {
      margin-bottom: 6px;
      line-height: 130%;
    }
  }
`;
