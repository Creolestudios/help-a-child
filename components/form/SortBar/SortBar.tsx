import Dropdown from "../Dropdown/Dropdown";
import ListIcon from "../../icons/ListIcon/ListIcon";
import React from "react";
import { debounce } from "@mui/material";
import { useForm } from "react-hook-form";

const defaultSortOptions = [
  { name: "Titel (a-z)", value: "title" },
  { name: "Titel (z-a)", value: "-title" },
  { name: "Auteur (a-z)", value: "author" },
  { name: "Auteur (z-a)", value: "-author" },
  { name: "Datum (oud-nieuw)", value: "date_created" },
  { name: "Datum (nieuw-oud)", value: "-date_created" },
];

type Props = {
  /** The time the field will wait before triggering the callback */
  waitTime?: number;

  /** The availabled options used to sort */
  sortOptions?: typeof defaultSortOptions;

  /** The callback that will be called when the user searches */
  onSort?: (x: string) => void;
};

export default function SortBar({
  sortOptions = defaultSortOptions,
  onSort,
  waitTime = 300,
}: Props) {
  const { register } = useForm();

  const handleSort = (x: string) => {
    if (onSort) return onSort(x);
  };

  const debouncedSort = debounce(handleSort, waitTime);

  return (
    <Dropdown
      name="sort"
      placeholder="Sorteer op"
      register={register}
      onChange={debouncedSort}
      iconLeft={<ListIcon />}
      options={sortOptions}
    />
  );
}
