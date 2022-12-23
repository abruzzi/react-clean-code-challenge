import { ChangeEvent } from "react";
import { useCommandAndKey } from "./useCommandAndKey";

export const SearchBox = ({
  performSearch,
}: {
  performSearch: (term: string) => void;
}) => {
  const inputRef = useCommandAndKey("s");

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    performSearch(term);
  };

  return (
    <input
      ref={inputRef}
      type="text"
      data-testid="search-box"
      onChange={onSearch}
      placeholder="⌘ + s to start searching..."
    />
  );
};
