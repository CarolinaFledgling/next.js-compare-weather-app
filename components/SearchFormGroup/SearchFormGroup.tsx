import React from "react";

interface SearchFormGroupProps {
  //setSearchValueInput: Dispatch<SetStateAction<string>>;
}

export const SearchFormGroup = ({
  setSearchValueInput,
}: SearchFormGroupProps) => {
  return (
    <div className="form-group">
      <label htmlFor="country-search"> Search Country: </label>
      <input
        placeholder="search..."
        type="text"
        id="country-search"
        onChange={(event) => {
          setSearchValueInput(event.target.value);
        }}
      />
    </div>
  );
};
