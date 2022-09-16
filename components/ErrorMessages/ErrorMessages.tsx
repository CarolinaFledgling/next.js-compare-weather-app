import React from "react";

interface ErrorMessagesProps {
  inputError: boolean;
  fetchError: boolean;
  errorNotFoundCapita: boolean;
  errorFoundTheSameCountry: boolean;
}

export const ErrorMessages = ({
  inputError,
  fetchError,
  errorNotFoundCapita,
  errorFoundTheSameCountry,
}: ErrorMessagesProps) => {
  return (
    <>
      {inputError && <p>Please write the name of country </p>}
      {fetchError && <p>Something went wrong with API Call </p>}
      {errorNotFoundCapita && (
        <p>Sorry Not found Country, Please write again </p>
      )}
      {errorFoundTheSameCountry && (
        <p>You have already added that country to the list </p>
      )}
    </>
  );
};
