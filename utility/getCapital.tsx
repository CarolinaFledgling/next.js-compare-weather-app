import { useEffect, useState } from "react";

interface DataCountryItem {
  name: string;
  capital: string;
}

type DataCountryArray = Array<DataCountryItem>;

interface DataCountry {
  error: boolean;
  msg: string;
  data: DataCountryArray;
}

export const useGetCapital = () => {
  const [data, setData] = useState<DataCountry | undefined>(undefined);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/capital")
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch data");
        }
        return res.json();
      })
      .then((data: DataCountry) => {
        console.log("data from getCapital", data);
        setData(data);
      })
      .catch((err) => {
        console.log(err.message);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return {
    data,
    isError,
    isLoading,
  };
};
