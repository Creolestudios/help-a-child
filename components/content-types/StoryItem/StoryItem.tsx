import { H1, H3, H4, H5, P } from "../../typography";

import Button from "../../buttons/Button";
/* eslint-disable @next/next/no-img-element */
import Card from "../../card/Card";
import Image from "next/image";
import React from "react";
import { VolunteerStory } from "../../../types/content-types/VolunteerStory.type";
import parseImageURL from "../../../utils/parseImageURL";
import { truncate } from "../../../utils/truncate";

interface StoryItemProps extends Partial<VolunteerStory> {}

export default function StoryItem({
  title,
  image,
  volunteer_name,
  description,
  slug,
}: StoryItemProps) {
  return (
    <Card variant="story">
      <div className="flex flex-col gap-4">
        {image && (
          <Image
            priority
            className="h-full w-full object-cover rounded-lg"
            src={parseImageURL(image.id)}
            alt={title ?? "Verhaal afbeelding"}
            width={500}
            height={300}
          />
        )}
        <H3 variant="bold" color="black" style={{ margin: 0 }}>
          {title}
        </H3>
        <H5 style={{ margin: 0 }}>Door {volunteer_name}</H5>

        <P>{truncate(description ?? "", 200)}</P>

        <Button href={`#`}>Lees het verhaal</Button>
      </div>
    </Card>
  );
}
