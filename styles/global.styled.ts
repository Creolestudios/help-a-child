import styled from "styled-components";
import { Container } from "@mui/system";
import { Grid } from "@mui/material";

const HeroBannerWrapper = styled(Container)`
  .title-wrap {
    text-align: center !important;
    align-items: center;
    justify-content: center;
    margin: 0 auto !important;
    width: 100%;
  }
  .subtitle {
    font-size: 18px !important;
    font-weight: 300 !important;
    line-height: 160% !important;
    font-family: "Avenir";
    font-style: "normal";
    color: #fff !important;
  }
  .title {
    width: 100%;
    font-size: 64px !important;
    font-weight: 400 !important;
    line-height: 140% !important;
    font-family: "Fjalla One";
    font-style: "normal";
  }
  &.zoeken-page {
    .search {
      font-size: 28px !important;
      font-weight: 500 !important;
      span {
        font-size: 32px !important;
        padding: 15px !important;
        font-weight: 400 !important;
      }
    }
    .title {
      margin-bottom: 32px !important;
      line-height: 118% !important;
      font-size: 80px !important;
    }
  }
  &.stel-een-vraag {
    margin-top: -100px;
  }
  &.volunteer {
    &.overview {
      .overview-act {
        border: 1px solid #fff !important;
        &:hover {
          border: none !important;
        }
      }
      .title {
        line-height: 140% !important;
      }
    }
  }
  @media (max-width: 767px) {
    .title-wrap {
      text-align: left !important;
    }
    .title {
      font-size: 46px !important;
    }
    .subtitle {
      font-size: 16px !important;
    }
    &.stel-een-vraag {
      margin-top: -50px;
    }
    &.training {
      margin-top: -200px !important;
    }
    .volunteer.overvies {
      .subtitle {
        font-weight: 400 !important;
      }
    }
    &.zoeken-page {
      .search {
        font-size: 20px !important;
        span {
          font-size: 18px !important;
        }
      }

      .title {
        margin-bottom: 32px !important;
        line-height: 118% !important;
        font-size: 46px !important;
      }
    }
  }
`;

const ContainerWrapper = styled(Container)<{ cardHeight?: number | string }>`
  .cardHeight {
    max-height: ${({ cardHeight }) => `${cardHeight}px`};
    padding-top: 0;
  }
  &.lg-container {
    max-width: 1384px !important;
  }
  &.sm-container {
    max-width: 1118px;
  }
  @media (max-width: 767px) {
    ul {
      max-height: 400px;
      height: 100%;
    }
    .cardHeight {
      margin-top: 40px;
    }
    &.zoeken {
      margin-top: -80px !important;
      section > p {
        font-size: 30px;
      }
      ul > li {
        font-size: 16px;
      }
    }
  }
`;

const ForumFlipWrapper = styled(Grid)`
  &.form-card {
    perspective: 4000px;
    position: relative;
    height: 600px;
  }
  .front .main-forum.forum-post {
    background: #fe517e;
    width: 100%;
    .forum-tags span {
      color: #fe517e !important;
    }
  }
  .back .main-forum.forum-post {
    background: #fff !important;
    width: 100%;
  }
  .forum-content {
    position: relative;
    width: 100%;
    height: 100%;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    text-align: left;

    transition: transform 1s;
    transform-style: preserve-3d;
    .custom_forum_tags {
      line-height: 1.5;
    }
  }
  &.forum-card:hover .forum-content {
    transform: rotateY(180deg);
    transition: transform 0.5s;
    .back .main-forum.forum-post.forum-list {
      .forum-tags span {
        background: #3fc7b4 !important;
        color: #fff !important;
      }
      .back-act {
        background: #3fc7b4 !important;
        border: none !important;
      }
    }
  }

  .front,
  .back {
    position: absolute;
    height: 100%;
    width: 100%;
    line-height: 300px;
    // color: #03446a;
    font-size: 60px;
    border-radius: 5px;
    backface-visibility: hidden;
  }

  .back {
    h4,
    h3,
    p,
    div {
      color: #150f2f !important;
    }
    transform: rotateY(180deg);
  }
  .back .main-forum.forum-post .forum-tags .forum-tag {
    color: #fff !important;
    background: #fe517e !important;
  }
  .front .forum-tags span {
    color: #fe517e !important;
  }
  .front .main-forum.forum-post.forum-list {
    .forum-tags span {
      color: #3fc7b4 !important;
    }
    .back-act {
      background: #3fc7b4 !important;
      border: none !important;
    }
  }
  .back .main-forum.forum-post.forum-list {
    .forum-tags span {
      background: #3fc7b4 !important;
      color: #fff !important;
    }
    .forum-link:hover {
      button {
        color: #fff !important;
      }
    }
  }
  .front .main-forum.forum-post.forum-list {
    .forum-footer {
      height: auto !important;
    }
  }
`;
export { HeroBannerWrapper, ContainerWrapper, ForumFlipWrapper };
