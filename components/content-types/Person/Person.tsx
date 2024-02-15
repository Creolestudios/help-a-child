import { ColorType } from "../../../types/colorTypes";
import { P } from "../../typography";
import React from "react";
import UserAvatar from "../../icons/UserAvatar/UserAvatar";
import styled from "styled-components";

type Props = {
  age?: string;
  name: string;
  avatar?: string;
  size?: "sm" | "md";
  color?: ColorType;
};

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  .profile-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 18px !important;
  }
  @media (max-width: 767px) {
    .profile-meta {
      font-size: 16px !important;
    }
  }
`;

export default function Person({
  age,
  name,
  size = "sm",
  color,
  avatar,
}: Props) {
  return (
    <StyledWrapper>
      {avatar && (
        <div className="profile-img">
          <UserAvatar src={avatar} alt={name} size={size} />
        </div>
      )}
      <div className="profile-meta">
        <P variant="bold" color={color}>
          {name}
        </P>
        {age && (
          <P color={color}>{age.includes("jaar") ? age : `${age} jaar`} </P>
        )}
      </div>
    </StyledWrapper>
  );
}
