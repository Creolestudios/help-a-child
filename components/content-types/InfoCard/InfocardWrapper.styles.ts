import styled from "styled-components";

export const InfoCardWrapper = styled.div`
  .info-card {
    cursor: default !important;
  }
  .cursor-pointer {
    cursor: pointer !important;
  }
  .training {
    height: 180px;
  }
  .footer-content {
    margin-top: 16px;
  }
  .footer-title {
    line-height: 120% !important;
  }
  flex: 1;

  &.blog:hover {
    article {
      background: #fff !important;
    }
    .info-card-footer a,
    button {
      background: #fe517e !important;
      color: #fff !important;
    }
  }
  &.primary:hover {
    article {
      background: #fff !important;
    }
    .info-card-footer a,
    button {
      background: #006ef7 !important;
      color: #fff !important;
    }
  }
  &.blog {
    header span {
      background: #fe517e !important;
    }
  }
  &.primary {
    header span {
      background: #006ef7 !important;
      border-color: #006ef7 !important;
    }
  }
  &:hover {
    .info-card-footer h2,
    p,
    button,
    div,
    a {
      color: #150f2f !important;
    }
  }
  &.ideal {
    /* header span { */
    background: #ffecf1 !important;
    border-color: #ffecf1 !important;
    border-radius: 8px;
    /* } */
    p {
       {
        color: #000 !important;
        background: #fe517e;
      }
    }
    h2.footer-title,
    p,
    .footer-content {
      color: #150f2f !important;
    }
    ,
    > div {
      color: #000 !important;
      background: #fe517e;
    }

    &:hover {
      button,
      a {
        color: #fff !important;
      }
    }
  }
  .about-training {
    .footer-title {
      margin-bottom: 32px !important;
    }
  }
  &.follow {
    background: #ebfffc !important;
    border-color: #ebfffc !important;
    p,
    .footer-title,
    div {
      color: #150f2f !important;
    }
    border-radius: 8px;
    &:hover {
      button,
      a {
        color: #fff !important;
      }
    }
  }
  header {
    height: 180px !important;
    img {
      height: 180px !important;
    }
  }
  .footer-content {
    margin-bottom: 20px;
  }
  .info-card-footer {
    .footer-title {
      font-size: 42px !important;
      font-weight: 400 !important;
      margin-bottom: 12px;
    }
    .footer-content {
      font-size: 18px !important;
      font-weight: 300 !important;
    }
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100%;
  }
  .small-fonts {
    .footer-title {
      margin-bottom: 12px !important;
      font-size: 32px !important;
    }
  }
  @media (min-width: 768px) and (max-width: 1106px) {
    h2 {
      font-size: 34px;
    }
  }
  @media (max-width: 767px) {
    .training {
      height: 230px;
    }
    .info-card-footer {
      .footer-title {
        font-size: 30px !important;
      }
      .footer-content {
        font-size: 16px !important;
      }
    }
    .small-fonts {
      .footer-title {
        font-size: 30px !important;
      }
    }
  }
`;
