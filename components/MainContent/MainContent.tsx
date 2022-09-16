import { v4 as uuidv4 } from "uuid";
import React, { useState, ChangeEvent, useEffect } from "react";
import styles from "../MainContent/MainContent.module.css";
import { MainForm } from "../MainForm/MainForm";
import { TableDetails } from "../TableDetails/TableDetails";
import { ErrorMessages } from "../ErrorMessages/ErrorMessages";

export default function MainContent() {
  const [valueInput, setValueInput] = useState<string>("");
  const [dataCountriesApi, setDataCountriesApi] = useState([]);

  const [errorNotFoundCapita, setErrorNotFoundCapital] = useState(false);
  const [errorFoundTheSameCountry, setErrorFoundTheSameCountry] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // Array of country , capital , weather Info
  const [detailsDataList, setDetailsDataList] = useState([]);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setValueInput(e.target.value);
  };

  const getWeather = (
    foundCapitalElement: string,
    dataCallback: () => void
  ) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${foundCapitalElement}&appid=${process.env.NEXT_PUBLIC_WEATHERAPI}`
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch data");
        }
        return res.json();
      })
      .then((data) => {
        console.log("weatherDataApi details: ", {
          data,
          dataName: data.name,
          dataWeather: data.weather,
        });
        const weatherDetails = data.weather.map((detail) => {
          return detail.main;
        });
        console.log("weatherDetails: ", weatherDetails);

        dataCallback(weatherDetails);
      })
      .catch((err) => {
        console.log("inputError", err);
        setFetchError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getCapital = (): void => {
    fetch("https://countriesnow.space/api/v0.1/countries/capital")
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch data");
        }
        return res.json();
      })
      .then((data) => {
        setDataCountriesApi(data);
      })
      .catch((err) => {
        console.log(err.message);
        setFetchError(true);
      });
  };

  useEffect(() => {
    getCapital();
  }, []);

  const findCapital = (providedCountry: string) => {
    
    const dataApi = dataCountriesApi?.data;
    //Find the value of the first element
    const foundCountry = dataApi?.find((item) => {
      const countryFromApi = item.name;
      //console.log(countryFromApi)
      if (providedCountry.toLowerCase() === countryFromApi.toLowerCase()) {
        return true;
      }
      return false;
    });

    //console.log("find capital", foundCountry?.capital);

    return foundCountry?.capital;
  };

  const handleSubmitForm = (e): void => {
    e.preventDefault();

    if (!valueInput) {
      setInputError(true);
      setErrorNotFoundCapital(false);
      setErrorFoundTheSameCountry(false);
      return;
    } else {
      setInputError(false);
    }

    //console.log("detailsDataList", detailsDataList);

    const found = detailsDataList.find((elem) => {
      return elem.country === valueInput;
    });

    if (found) {
      setErrorFoundTheSameCountry(true);
      setErrorNotFoundCapital(false);
      return;
    }

    console.log("found ele", found);

    setIsLoading(true);

    const foundCapitalElement = findCapital(valueInput);

    if (foundCapitalElement === undefined) {
      setErrorNotFoundCapital(true);
      setValueInput("");
      setIsLoading(false);
      setErrorFoundTheSameCountry(false);
      return;
    }

    // Second API to get Weather info
    if (foundCapitalElement) {
      getWeather(foundCapitalElement, (weatherDetails) => {
        const newElementDetail = {
          country: valueInput,
          capital: foundCapitalElement,
          weather: weatherDetails,
          id: uuidv4(),
        };

        setDetailsDataList((prevState) => {
          return [...prevState, newElementDetail];
        });
      });
    }

    setValueInput("");
  };

  console.log("detailsDataList", detailsDataList);

  // DELETING ELEMENT
  const handleDeleteElement = (e: any, id: number) => {
    e.preventDefault();

    const filteredElement = detailsDataList.filter((elem) => {
      // console.log("elem", elem.id);
      // console.log("id", id);
      return elem.id !== id;
    });

    console.log("filteredElement", filteredElement);
    setDetailsDataList(filteredElement);
  };

  return (
    <div className={styles.content}>
      <>
        <MainForm
          isLoading={isLoading}
          valueInput={valueInput}
          handleChangeInput={handleChangeInput}
          handleSubmitForm={handleSubmitForm}
        />
      </>
      <TableDetails
        detailsDataList={detailsDataList}
        handleDeleteElement={handleDeleteElement}
      />
      <ErrorMessages
        inputError={inputError}
        fetchError={fetchError}
        errorNotFoundCapita={errorNotFoundCapita}
        errorFoundTheSameCountry={errorFoundTheSameCountry}
      />
    </div>
  );
}
