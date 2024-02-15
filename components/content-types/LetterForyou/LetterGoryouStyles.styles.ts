import styled from "styled-components";

const LetterForYouStyles = styled.section`
  margin: 80px 0;
  h3 {
    font-family: Fjalla One;
    font-size: 32px;
    font-weight: 400;
  }
  p {
    font-family: "help__a__child___handwrittenRg";
    font-size: 30px;
    font-weight: 400;
    line-height: 150%;
  }
  strong,
  span {
    font-family: "help__a__child___handwrittenRg";
  }
  .letter__for__you {
    p {
      margin-bottom: 10px;
    }
  }
  .middle__color__letter__for__you {
    border-radius: 8px;
    background: #006ef7;
    color: #fff;
    padding: 40px;
    p {
      position: relative;
      padding-left: 32px;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 10px;
        width: 20px;
        height: 20px;
        background: url("/rightarrow.svg");
      }
    }
  }
  .ltter__for__you__bottom div {
    margin: 40px 0;
    border-radius: 8px;
    background: #006ef7;
    color: #fff;
    padding: 40px;
    p {
      position: relative;
      padding-left: 32px;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 10px;
        width: 20px;
        height: 20px;
        background: url("/rightarrow.svg");
      }
    }
  }
`;
export { LetterForYouStyles };
