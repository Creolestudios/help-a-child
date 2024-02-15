import styled from "styled-components";

export const MasonryGridWrapper = styled.div`
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
  .forum-card {
    perspective: 4000px;
    position: relative;
  }

  .new-post-item {
    .grid-item {
      background-repeat: no-repeat;
      background-size: cover;
      border-radius: 8px;
      .profile-meta {
        padding: 16px;
      }
      .custom_new_post {
        max-height: 250px;
        overflow-y: auto !important;
        padding-bottom: 20px;
      }
    }
  }

  .forum-content {
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

  .forum-card:hover .forum-content {
    transform: rotateY(180deg);
    transition: transform 0.5s;
  }

  .front,
  .back {
    position: absolute;
    height: 100%;
    width: 100%;
    // line-height: 300px;
    // color: #03446a;
    font-size: 60px;
    border-radius: 5px;
    backface-visibility: hidden;
  }
  .back .main-forum.forum-post {
    z-index: -1 !important;
    .forum-link:hover {
      button {
        color: #fe517e !important;
      }
    }
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
  .forum-post-2 .front .main-forum.forum-post .forum-tags span {
    color: #006ef7 !important;
  }
  .forum-post-2 .back .main-forum.forum-post .forum-tags .forum-tag {
    color: #fff !important;
    background: #006ef7 !important;
  }
  .forum-post-2 .back .main-forum.forum-post {
    .forum-link {
      &:hover {
        button {
          color: #006ef7 !important;
        }
      }
    }
  }
  @media (max-width: 768px) {
    .forum-post-2 .back .main-forum.forum-post {
      height: auto !important;
    }
  }
  margin-bottom: 32px;
  overflow-x: hidden;
  .mason-grid {
    .grid-item {
      margin: 11px;
      height: 100%;
      width: calc(100% - 22px);
    }
  }

  @media ${({ theme }) => theme.devices.tablet} {
    .mason-grid {
      display: flex;
      flex-wrap: wrap;

      .grid-item {
        max-height: 630px;
        margin: 16px auto;

        > div,
        > article,
        > figure {
          min-height: 100%;
          max-height: 630px;
          height: 630px;
          width: 100%;
        }

        > iframe {
          width: 100%;
          max-width: 100% !important;
        }

        &.grid-item-w-3 {
          width: calc(33% - 22px);
        }
        &.grid-item-w-4 {
          width: calc(50% - 22px);
        }
        &.grid-item-w-6 {
          width: calc(50% - 22px);
        }
        &.grid-item-w-8 {
          width: calc(50% - 22px);
          &:first-of-type {
            width: calc(100% - 22px);
          }
        }
      }
    }
  }
  @media ${({ theme }) => theme.devices.laptopL} {
    .mason-grid {
      .grid-item {
        &.grid-item-w-3 {
          width: calc(${(100 / 12) * 4}% - 22px);
        }
        &.grid-item-w-4 {
          width: calc(${(100 / 12) * 4}% - 22px);
        }
        &.grid-item-w-6 {
          width: calc(${(100 / 12) * 6}% - 22px);
        }
        &.grid-item-w-8 {
          width: calc(${(100 / 12) * 8}% - 22px);
          &:first-of-type {
            width: calc(${(100 / 12) * 8}% - 22px);
          }
        }
      }
    }
  }
`;
