import styled from "styled-components";
const LetterFormWrapper = styled.section`
  .comment-form-button {
    color: #fe517e !important;
  }
`;

const HeroButtonWrapper = styled.div`
  a {
    border: 2px solid #fff !important;
  }
  @media (max-width: 767px) {
    display: flex !important;
    flex-direction: column !important;
  }
`;

const ForumRulesWrapper = styled.section`
  div,
  p {
    font-family: Avenir;
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 160%;
  }
`;
export { LetterFormWrapper, HeroButtonWrapper, ForumRulesWrapper };
