import { debounce } from "@mui/material";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "styled-components";
import { ColorType } from "../../../types/colorTypes";
import SearchIcon from "../../icons/SearchIcon/SearchIcon";
import Input from "../Input/Input";

type Props = {
  iconColor?: ColorType;

  /** The placeholder of the input field */
  placeholder?: string;

  /** The time the field will wait before triggering the callback */
  waitTime?: number;

  /** The callback that will be called when the user searches */
  onSearch?: (x: string) => void;
};

export default function SearchBar({
  iconColor = "grey",
  placeholder = "Zoeken...",
  onSearch,
  waitTime = 300,
}: Props) {
  const { colors } = useTheme();
  const router = useRouter();

  const [val, setVal] = useState("");

  const handleSearch = useCallback(
    (x: React.ChangeEvent<HTMLInputElement> | string) => {
      const newVal = typeof x === "object" ? x.target.value : x;

      if (onSearch) {
        return onSearch(newVal);
      }
      return router.push(`/zoeken?q=${newVal}`);
    },
    [onSearch, router]
  );

  const debouncedSearch = debounce(handleSearch, waitTime);

  useEffect(() => {
    const query = router?.query?.q as string;

    if (
      router.isReady &&
      router.pathname === "/zoeken" &&
      query &&
      query !== val
    ) {
      setVal(query);
      handleSearch(query);
    }
  }, [handleSearch, router.isReady, router.pathname, router?.query?.q, val]);

  return (
    <Input
      iconLeft={<SearchIcon color={colors[iconColor].normal} />}
      placeholder={placeholder}
      defaultValue={val as string}
      onChange={debouncedSearch}
      borderColor="primary"
    />
  );
}
