import styled from "styled-components";

export const PeopleWrapper = styled.section`
  margin: 80px 0;
  .sub-title {
    font-weight: 300 !important;
    line-height: 160% !important;
  }
  .people-container {
    margin: auto;
  }
  .people-container .card-container {
    width: calc(25% - 22px) !important;
    margin-right: 22px;
  }
  .card-container {
    margin-right: 22px;
  }
  .card-container .title,
  .description {
    color: #150f2f;
    font-weight: 400;
  }
  .card-container .title {
    font-size: 26px;
    font-weight: 400;
  }

  @media (max-width: 991px) {
    .people-container .card-container {
      width: calc(50% - 22px) !important;
      margin-right: 22px;
      margin-bottom: 22px;
    }
  }
  @media (max-width: 767px) {
    margin: 40px 0;
    .card-container .title {
      font-size: 20px;
    }
  }
  @media (max-width: 767px) {
    .people-container .card-container {
      .title {
        font-size: 26px;
      }
      .description {
        line-height: 160% !important;
      }
    }
    .card-container footer {
      padding: 20px;
    }
    .card-container .title {
      font-size: 20px;
      margin: 0;
    }
    /* .people-container .card-container img {
      object-fit: fill !important;
    } */
  }
  @media (max-width: 600px) {
    .people-container .card-container {
      width: 100% !important;
      margin-right: 0;
      margin-bottom: 22px;
    }
    .people-container .card-container header {
      height: 250px;
    }
  }
`;
export const VideoWrapper = styled.section`
  .sub-title {
    line-height: 160%;
  }
  .video-container figure {
    width: calc(33.33% - 22px) !important;
    margin-right: 22px;
  }

  @media (max-width: 991px) {
    .video-container figure {
      height: 500px !important;
    }
    .video-container figure > div > div {
      height: 60px !important;
      width: 60px !important;
    }
    .video-container figcaption h3 {
      font-size: 32px;
      line-height: 120%;
    }
    /* .video-container figcaption p {
      line-height: 130%;
    } */
  }
  @media (max-width: 767px) {
    margin-top: 40px;
    .video-container {
      figure {
        width: 100% !important;
        height: 471px !important;
        margin: 20px 0px;
      }
      figcaption h3 {
        font-size: 32px;
        line-height: 120%;
      }
      figcaption p {
        line-height: 160%;
      }
    }
  }
`;

export const FaqStyle = styled.div`
  .faq-title {
    font-size: 26px;
  }
  @media (max-width: 767px) {
    .faq-title {
      font-size: 22px;
    }
  }
`;
