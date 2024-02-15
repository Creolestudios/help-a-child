import Button from "../../buttons/Button";
import { CircularProgress } from "@mui/material";
import { Container } from "@mui/system";
import { FAQ } from "../../../types/content-types/FAQ.type";
import FAQItem from "../FAQItem/FAQItem";
import { H3 } from "../../typography";
import React, { useState } from "react";
import { FAQListWrapper } from "./FAQListWrapper";

type Props = {
  title?: string;
  containerWidth?: "sm" | "md" | "lg" | "xl" | undefined;
  showLoadMore?: boolean;
  show?: boolean;
  items: FAQ[];
  isLoading?: boolean;
  onLoadMore?: () => void;
};

export default function FAQList({
  show,
  title,
  showLoadMore,
  items = [],
  isLoading = false,
  onLoadMore,
  containerWidth = "xl",
}: Props) {
  const [selected, setSelected] = React.useState<string>(items[0]?.id ?? "");

  const [visible, setVisible] = useState(false);
  const handleClick = () => {
    if (onLoadMore) onLoadMore();
  };
  return (
    <div className={`${show ? "block" : "hidden sm:block"}`}>
      <FAQListWrapper
        className="md:text-center mb-"
        style={{ marginBottom: showLoadMore ? 56 : 0 }}
      >
        {!!title && (
          <Container maxWidth={containerWidth}>
            <div className="flex flex-col md:items-center md:justify-center mb-[20px]  md:mb-14">
              <H3
                variant="bold"
                color="black"
                className="faq-title font-[400] md:text-[42px]"
              >
                {title}
              </H3>
            </div>
          </Container>
        )}

        <Container maxWidth={containerWidth}>
          <div className="flex flex-col gap-4">
            {items?.map((faq: FAQ, index) => (
              <>
                {index !== 0 && index !== 4 && (
                  <FAQItem
                    id={faq.id}
                    isSelected={selected === faq.id}
                    key={faq.id}
                    title={faq.title}
                    description={faq.description}
                    onSelect={(id) => {
                      setSelected(id);
                    }}
                    visible={visible}
                    setVisible={setVisible}
                    selected={selected}
                  />
                )}
              </>
            ))}
          </div>
        </Container>
        <div className="flex items-center justify-center">
          {isLoading && <CircularProgress size={"30px"} />}
        </div>
      </FAQListWrapper>
      {showLoadMore && (
        <Container
          style={{ marginBottom: 80, marginTop: "20px" }}
          maxWidth="xl"
        >
          <Button onClick={handleClick}>Meer laden</Button>
        </Container>
      )}
    </div>
  );
}
