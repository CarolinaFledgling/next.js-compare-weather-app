import React from "react";

interface ErrorMessagesProps {
  error: boolean;
  fetchError: boolean;
  errorNotFoundCapita: boolean;
  errorFoundTheSameCountry: boolean;
}

export const ErrorMessages = ({
  error,
  fetchError,
  errorNotFoundCapita,
  errorFoundTheSameCountry,
}: ErrorMessagesProps) => {
  return (
    <>
      {error && <p>Please write the name of country </p>}
      {fetchError && <p>Something went wrong with API Call </p>}
      {errorNotFoundCapita && (
        <p>Sorry Not found Country, Please write again </p>
      )}
      {errorFoundTheSameCountry && <p>there is it on the our list </p>}
    </>
  );
};
