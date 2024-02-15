import { H3, P } from "../../typography";

import Button from "../../buttons/Button";
import Card from "../../card/Card";
import CardFooter from "../../card/CardFooter/CardFooter";
import CardHeader from "../../card/CardHeader/CardHeader";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

const DescriptionText = styled.p`
  margin-bottom: 0;
`;

const CommonDetailCardWrapper = styled(Card)`
  a {
    margin-top: 20px !important;
    background: #fff;
    border: none;
    color: #ff971d !important;
  }
  &.divorced-parents {
    margin-bottom: 20px;
    width: calc(25% - 15px) !important;
    a {
      margin-top: 32px !important;
    }
    @media (max-width: 991px) {
      width: calc(50% - 20px) !important;
      &:nth-child(2) {
        margin-right: 0 !important;
      }
    }
    @media (max-width: 767px) {
      width: calc(100% - 20px) !important;
    }
    footer {
      height: 100%;
      display: flex;
      flex-direction: column;
      z p {
        margin-bottom: 20px;
      }
    }
    a {
      margin-top: auto;
    }
  }
  &.volunteer-detail {
    box-shadow: none !important;
  }
  // footer {
  //   display: flex;
  //   flex-direction: column;
  //   flex: 1;
  // }
`;
const CommonDetailCard = ({
  title,
  description,
  imageUrl,
  button,
  variant,
  buttonLink,
  leftIcon,
  className,
}: any) => {
  const generateMediaItem = () => {
    let Child = null;
    if (imageUrl) {
      Child = (
        <Image
          priority
          className="absolute h-full w-full top-0 left-0 z-0 object-cover"
          src={imageUrl}
          alt={title}
          fill
        />
      );
    }
    if (!Child) return;
    return <CardHeader>{Child}</CardHeader>;
  };
  return (
    <CommonDetailCardWrapper
      className={`card-container ${className}`}
      variant={variant}
    >
      {generateMediaItem()}
      <CardFooter>
        <div className="icon-title-wrapper">
          {!!leftIcon && (
            <img className="object-cover" src={leftIcon} alt={title} />
          )}
          <H3 className="title mt-0">{title}</H3>
        </div>
        {typeof description === "string" ? (
          <DescriptionText className="description">
            {description}
          </DescriptionText>
        ) : (
          <div className="description">{description}</div>
        )}
        {button && (
          <Button href={buttonLink} className="text-[18px] font-[400]">
            {button}
          </Button>
        )}
      </CardFooter>
    </CommonDetailCardWrapper>
  );
};

export default CommonDetailCard;
