import React, { ChangeEvent } from "react";

interface SearchFormGroupProps {
  handleSearchElement: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchFormGroup = ({
  handleSearchElement,
}: SearchFormGroupProps) => {
  return (
    <div className="form-group">
      <label className="label" htmlFor="country-search"> Find Country in the List: </label>
      <input
      className="input"
        placeholder="Poland"
        type="text"
        id="country-search"
        onChange={handleSearchElement}
      />
    </div>
  );
};
