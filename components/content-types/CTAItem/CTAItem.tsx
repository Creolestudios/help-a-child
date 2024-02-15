import Button, { ButtonVariant } from "../../buttons/Button";
import { H4, P } from "../../typography";

import React from "react";
import { useRouter } from "next/router";

interface CTAItemProps {
  title: string;
  description: string;
  buttonLabel?: string;
  buttonURL?: string;
  buttonVariant?: ButtonVariant;
}

const CTAItem: React.FC<CTAItemProps> = ({
  title,
  description,
  buttonLabel,
  buttonURL,
  buttonVariant,
}) => {
  const router = useRouter();

  return (
    <div className="rounded-lg bg-white border-2 border-orange-900 flex flex-col gap-10 p-10 ">
      <span className="max-w-[320px] mx-auto flex flex-col gap-5">
        <H4
          style={{
            marginBottom: "-20px",
          }}
          variant="bold"
        >
          {title}
        </H4>
        <P>{description}</P>

        {buttonLabel && buttonURL && buttonVariant && (
          <Button
            variant={buttonVariant}
            onClick={() => router.push(buttonURL)}
          >
            {buttonLabel}
          </Button>
        )}
      </span>
    </div>
  );
};

export default CTAItem;
