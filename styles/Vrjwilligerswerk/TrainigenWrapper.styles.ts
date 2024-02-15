import styled from "styled-components";

export const TrainigenHeroWrapper = styled.section`
  @media (max-width: 767px) {
    > div {
      height: 564px;
    }
  }
`;
export const TrainingBlogWrapper = styled.section`
  margin-top: -100px;
  .training-blog {
    .title {
      font-weight: 400;
    }
    position: relative;
    display: flex;
  }
  .training-blog article {
    margin-right: 22px;
    flex: 1;
  }
  .training-blog article:last-child {
    margin-right: 0;
  }
  @media (max-width: 991px) {
    .training-blog footer h4 {
      font-size: 34px;
    }
    .training-blog footer a {
      margin-top: 34px !important;
    }
    .blog-description p {
      line-height: 160%;
      margin-bottom: 20px;
    }
  }
  @media (max-width: 767px) {
    margin-top: -350px !important;
    .training-blog {
      flex-direction: column;
    }
    .training-blog article {
      margin-right: 0;
    }
    .training-blog article:last-child {
      margin-top: 20px;
    }
  }
`;
export const TrainigenIdealWrapper = styled.section`
  margin: 128px 0 80px 0 !important;
  .footer-content p {
    background: none !important;
  }
  .ideal-container {
    z-index: 1;
  }
  @media (max-width: 767px) {
    .info-card-footer {
      line-height: 160%;
    }
    margin: 80px 0 !important;
  }
`;

export const PackageWrapper = styled.section`
  .package-container .card-container {
    margin-right: 20px;
    flex: 1;
  }
  .package-container .card-container footer {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .package-container {
    article:last-child {
      margin-right: 0;
    }
    footer {
      padding: 32px 20px;
      h3 {
        font-size: 32px;
      }
    }
  }
  .package-container .card-container .description {
    margin-bottom: 20px;
  }
  .package-container .card-container .title {
    word-break: break-word;
  }
  .package-container .card-container footer a {
    margin-top: auto;
    background: #3fc7b4;
    border-radius: 12px;
    color: #fff;
  }
  .packagelist-item {
    display: flex;
  }
  .packagelist-item::before {
    content: "";
    position: relative;
    left: 0;
    top: 8px;
    border: none;
    border-left: 2px solid #000;
    margin-right: 8px;
    border-bottom: 2px solid #000;
    width: 15px;
    height: 8px;
    transform: rotate(-45deg);
  }

  @media (max-width: 991px) {
    .package-container .card-container {
      width: calc(50% - 20px);
      flex: none;
      margin-bottom: 20px;
    }
  }

  @media (max-width: 767px) {
    margin-top: 40px !important;
  }
  @media (max-width: 600px) {
    .package-container .card-container {
      width: calc(100% - 20px);
      flex: none;
    }
  }
`;
