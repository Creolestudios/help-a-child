import Button from "../../buttons/Button";
import { ColorType } from "../../../types/colorTypes";
import { P } from "../../typography";
import React from "react";
import Tag from "../../buttons/Tag/Tag";
import UserAvatar from "../../icons/UserAvatar/UserAvatar";
import styled from "styled-components";

type Props = {
  title?: string;
  description?: string;
  bgImg: string;

  buttonText?: string;
  color?: ColorType;
};

const StyledWrapper = styled.div<{ bgImg: string }>`
  display: flex;
  align-items: baseline;
  height: 100%;
  width: 100%;
  gap: 16px;
  border-radius: 8px;

  color: white;
  cursor: pointer;
  background-image: ${({ bgImg }) => `url(${bgImg})`};
  background-repeat: no-repeat;
  background-size: cover;
  /* Additional background styles can be applied here */

  .profile-meta {
    display: flex;
    align-items: start;
    font-size: 32px;
    flex-direction: column;
    justify-content: space-between;
    padding: 36px;
    height: 100%;
  }
  h3,
  h4,
  h5,
  h6,
  p {
    color: inherit;
    text-align: left;
  }
  p {
    font-size: 18px;
  }
  .tips-content {
    > div {
      font-size: 18px;
    }
  }

  @media (max-width: 767px) {
    .profile-meta {
      font-size: 16px !important;
    }
  }
`;

export default function NewPostItem({
  title,

  description,
  buttonText,
  bgImg,
}: Props) {
  return (
    <StyledWrapper bgImg={bgImg}>
      <div className="profile-meta">
        {buttonText && (
          <Tag variant="dark" size="m">
            {buttonText}
          </Tag>
        )}
        <div className="custom_new_post">
          {title && <h3>{title}</h3>}
          {description && (
            <div
              dangerouslySetInnerHTML={{ __html: description }}
              className="tips-content"
            />
          )}
        </div>
      </div>
    </StyledWrapper>
  );
}
