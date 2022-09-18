import React, { ChangeEvent } from "react";

interface SearchFormGroupProps {
  handleSearchElement: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchFormGroup = ({
  handleSearchElement,
}: SearchFormGroupProps) => {
  return (
    <div className="form-group">
      <label htmlFor="country-search"> Search Country: </label>
      <input
        placeholder="search..."
        type="text"
        id="country-search"
        onChange={handleSearchElement}
      />
    </div>
  );
};
