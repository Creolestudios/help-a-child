import styled from "styled-components";

export const BuddymediaWrapper = styled.section`
  margin-top: -120px;
`;
export const ReflectiveCardWrapper = styled.section`
  margin-top: 80px;
  .container-reflect {
    article {
      width: calc(33.33% - 20px);
      margin-right: 20px;
      footer {
        h3,
        p {
          color: #fff;
          font-size: 18px;
        }
        h3 {
          font-size: 26px;
          font-weight: 400;
        }
      }
    }
    article:last-child {
      margin-right: 0;
    }
    .icon-title-wrapper {
      display: flex;

      align-items: center;
      img {
        margin-right: 10px;
      }
    }
  }
  .left-icon {
    position: relative !important;
    width: 50px !important;
    height: 50px !important;
  }

  @media (max-width: 1080px) and (min-width: 992px) {
    .container-reflect {
      article {
        h3 {
          font-size: 23px !important;
        }
      }
    }
  }
  @media (max-width: 767px) {
    .container-reflect {
      article {
        margin-right: 0;
        margin-bottom: 20px;
        width: 100%;
        p {
          font-size: 16px;
        }
        h3 {
          font-size: 22px !important;
          line-height: 120%;
        }
      }
    }
  }
`;
