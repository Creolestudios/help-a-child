import React from "react";
import { LetterForYouStyles } from "./LetterGoryouStyles.styles";

const LetterForyou = ({
  letter_for_you,
  middle_colored_letter_for_you,
  bottom_letter_for_you,
}: any) => {
  return (
    <LetterForYouStyles>
      {letter_for_you && (
        <div
          className="letter__for__you my-[64px]"
          dangerouslySetInnerHTML={{ __html: letter_for_you }}
        />
      )}

      {middle_colored_letter_for_you && (
        <div
          className="middle__color__letter__for__you my-[64px]"
          dangerouslySetInnerHTML={{
            __html: middle_colored_letter_for_you,
          }}
        />
      )}

      {bottom_letter_for_you && (
        <div
          className="ltter__for__you__bottom my-[64px]"
          dangerouslySetInnerHTML={{
            __html: bottom_letter_for_you,
          }}
        />
      )}
    </LetterForYouStyles>
  );
};

export default LetterForyou;
