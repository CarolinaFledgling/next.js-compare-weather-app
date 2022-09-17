import React from "react";

interface SearchedValueViewProps {
  detailsDataList: never[];
  searchValueInput: string;
}

export const SearchedValueView = ({
  detailsDataList,
  searchValueInput,
}: SearchedValueViewProps) => {
  return (
    <div>
      {detailsDataList
        .filter((value) => {
          if (searchValueInput == "") {
            return false;
          } else if (
            value.country.toLowerCase().includes(searchValueInput.toLowerCase())
          ) {
            return true;
          }
        })
        .map((elem, index) => {
          return (
            <div className="searched-wrapper" key={index}>
              <p>{elem.country}</p>
              <p>{elem.capital}</p>
              <p>{elem.weather}</p>
            </div>
          );
        })}
    </div>
  );
};
