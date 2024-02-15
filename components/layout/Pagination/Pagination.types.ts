export type PaginationProps = {
  /** The total amount of items of the pagination */
  total: number;

  /** Wether to show a shortened variant of the pagination items */
  truncated?: boolean;

  /** Event called when the page changes */
  onChange?: (x: number) => void;
};
