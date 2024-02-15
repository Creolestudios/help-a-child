import { ANDROID_APP_URL, IOS_APP_URL } from "../../../constants/app-configs";
import Button, { ButtonVariant } from "../../buttons/Button";
import { FaAppStoreIos, FaGooglePlay } from "react-icons/fa";
import { H3, TitleWithHighlights } from "../../typography";

import Image from "next/image";
import React from "react";
import parseHTMLtoReact from "../../../utils/parseHTMLtoReact";
import { useRouter } from "next/router";

interface TextItemProps {
  title: string;
  titleHighlighted?: string | string[];
  content: string;
  imageURL?: string;
  imageAlt: string;
  showAppStoreButtons?: boolean;
  showButton?: boolean;
  buttonLabel?: string;
  buttonURL?: string;
  buttonVariant?: ButtonVariant;
  rtl?: boolean;
  borderImg?: boolean;
}

const TextItem: React.FC<TextItemProps> = ({
  title,
  titleHighlighted,
  content,
  imageURL,
  imageAlt,
  buttonLabel,
  buttonURL,
  showAppStoreButtons = false,
  showButton = false,
  buttonVariant = "primary",
  borderImg = false,
  rtl = false,
}) => {
  const router = useRouter();

  return (
    <div
      className={`grid sm:grid-cols-1 md:grid-cols-2 gap-10 items-center md:gap-[118px]`}
    >
      {rtl ? (
        <>
          <div>
            {titleHighlighted && title ? (
              <TitleWithHighlights
                highlightColor="info"
                text={title}
                textToHighlight={titleHighlighted}
                headerElement="h3"
                color="black"
              />
            ) : (
              <H3 variant="bold">{title}</H3>
            )}

            <div className="mb-8">{parseHTMLtoReact(content)}</div>

            {showButton && buttonURL && buttonLabel && (
              <div className="w-80 mb-12">
                <Button
                  variant={buttonVariant}
                  onClick={() => router.push(buttonURL)}
                >
                  {buttonLabel}
                </Button>
              </div>
            )}

            {showAppStoreButtons && (
              <div className="flex gap-8">
                <Button href={IOS_APP_URL}>
                  <FaAppStoreIos size={25} />
                  App Store
                </Button>
                <Button href={ANDROID_APP_URL}>
                  <FaGooglePlay size={25} />
                  Google Play
                </Button>
              </div>
            )}
          </div>
          {imageURL ? (
            <Image
              priority
              src={imageURL}
              alt={imageAlt}
              width={472}
              height={388}
              className={"rounded-lg w-full object-cover "}
            />
          ) : (
            <div className="w-[472px] h-[388px]" />
          )}
        </>
      ) : (
        <>
          {imageURL ? (
            <Image
              priority
              src={imageURL}
              alt={imageAlt}
              width={472}
              height={388}
              className={`rounded-lg w-full object-cover ${
                borderImg ? "border" : ""
              }`}
            />
          ) : (
            <div className="w-[472px] h-[388px]" />
          )}
          <div>
            {titleHighlighted && title ? (
              <TitleWithHighlights
                highlightColor="info"
                text={title}
                textToHighlight={titleHighlighted}
                headerElement="h3"
                color="black"
              />
            ) : (
              <H3 variant="bold">{title}</H3>
            )}
            <div className="mb-14">{parseHTMLtoReact(content)}</div>

            {showButton && buttonURL && buttonLabel && (
              <div className="w-80 mb-12">
                <Button variant={buttonVariant} href={buttonURL}>
                  {buttonLabel}
                </Button>
              </div>
            )}
            {showAppStoreButtons && (
              <div className="flex gap-8">
                <Button href={IOS_APP_URL}>
                  <FaAppStoreIos size={25} />
                  App Store
                </Button>
                <Button href={ANDROID_APP_URL}>
                  <FaGooglePlay size={25} />
                  Google Play
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TextItem;
