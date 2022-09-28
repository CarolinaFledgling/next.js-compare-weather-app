import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import HeaderSection from "../components/HeaderSection/HeaderSection";
import { v4 as uuidv4 } from "uuid";
import { SingleTemplate } from "../components/SingleTemplate/SingleTemplate";
import { EditingTemplate } from "../components/EditingTemplate/EditingTemplate";
import { ErrorMessages } from "../components/ErrorMessages/ErrorMessages";
import { SubmitFormGroup } from "../components/SubmitFormGroup/SubmitFormGroup";
import { SearchFormGroup } from "../components/SearchFormGroup/SearchFormGroup";
import { SearchedValueView } from "../components/SearchedValueView/SearchedValueView";
import { useGetCapital } from "../utility/getCapital";

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

interface WeatherItem {
  main: string;
}

interface DataWeather {
  weather: WeatherItem[];
}

interface DetailsDataItem {
  country: string;
  capital: string;
  weather: string[];
  id: string;
}

type DetailsDataList = DetailsDataItem[];

export default function Home() {
  const [valueInput, setValueInput] = useState("");

  const [error, setError] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [errorNotFoundCapita, setErrorNotFoundCapital] = useState(false);
  const [errorFoundTheSameCountry, setErrorFoundTheSameCountry] =
    useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  // Array of country , capital , weather Info
  const [detailsDataList, setDetailsDataList] = useState<DetailsDataList>([]);
  // Edit functionality
  const [inputSaveValue, setInputSaveValue] = useState("");
  const [savedIdEditElement, setSavedIDEditElement] = useState<
    string | undefined
  >(undefined);
  // Search
  const [searchValueInput, setSearchValueInput] = useState("");

  const {
    data: dataCountriesApi,
    isError: isCapitalFetchError,
    isLoading: isCapitalLoading,
  } = useGetCapital();

  //---------------------------------------------------------------------------//
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setValueInput(e.target.value);
  };

  const handleSave = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputSaveValue(e.target.value);
  };

  const handleSearchElement = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchValueInput(e.target.value);
  };

  const getWeather = (
    foundCapitalElement: string,
    dataCallback: (weatherDetails: string[]) => void
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
      .then((data: DataWeather) => {
        console.log("weatherDataApi details fetch: ", data);
        const weatherDetails = data.weather.map((detail) => {
          return detail.main;
        });
        console.log("weatherDetails: ", weatherDetails);

        dataCallback(weatherDetails);
      })
      .catch((err) => {
        console.log("error", err);
        setFetchError(true);
      })
      .finally(() => {
        setIsSaveLoading(false);
        setIsLoading(false);
      });
  };

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

    console.log("find capital", foundCountry?.capital);

    return foundCountry?.capital;
  };

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();

    if (!valueInput) {
      setError(true);
      return;
    } else {
      setError(false);
    }

    console.log("detailsDataList", detailsDataList);

    const found = detailsDataList.find((elem) => {
      return elem.country === valueInput;
    });

    if (found) {
      setErrorFoundTheSameCountry(true);
      return;
    }

    console.log("found ele", found);

    setIsLoading(true);

    const foundCapitalElement = findCapital(valueInput);

    if (foundCapitalElement === undefined) {
      setErrorNotFoundCapital(true);
      setValueInput("");
      setIsLoading(false);
      return;
    }

    // Second API to get Weather info
    // Second API to get Weather info
    if (foundCapitalElement) {
      getWeather(foundCapitalElement, (weatherDetails) => {
        const newElementDetail: DetailsDataItem = {
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
  const handleDeleteElement = (e: any, id: string) => {
    e.preventDefault();

    const filteredElement = detailsDataList.filter((elem) => {
      console.log("elem", elem.id);
      console.log("id", id);
      return elem.id !== id;
    });

    console.log("filteredElement", filteredElement);

    setDetailsDataList(filteredElement);
  };

  // EDITING ELEMENT

  const handleEditClick = (e: Event, element: DetailsDataItem, id: string) => {
    e.preventDefault();
    console.log("Edit id", id);
    console.log("Edit element", element);

    // default Value when we editing
    setInputSaveValue(element.country);
    setSavedIDEditElement(id);
  };

  const handlerChangeSaveEditing = (e: FormEvent) => {
    e.preventDefault();

    setIsSaveLoading(true);

    let findElement = detailsDataList.find((elem) => {
      return elem.id === savedIdEditElement;
    });

    console.log("findElement w Edit", findElement);

    if (findElement) {
      findElement.country = inputSaveValue;
    } else {
      return;
    }

    //console.log("findElement w Edit", findElement);

    const foundCapitalElement = findCapital(inputSaveValue);

    // Second API to get Weather info
    if (foundCapitalElement) {
      getWeather(foundCapitalElement, (weatherDetails) => {
        if (findElement) {
          findElement.weather = weatherDetails;
          findElement.capital = foundCapitalElement;
        }

        setSavedIDEditElement(undefined);
        setDetailsDataList([...detailsDataList]);
      });
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Compare the weather </title>
        <meta name="description" content="Tool for comparing the weather" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <HeaderSection />

        {isCapitalFetchError || isCapitalLoading ? (
          <>
            {isCapitalLoading && "Loading capital data"}
            {isCapitalFetchError && "Failed to load capital data"}
          </>
        ) : (
          <section className={styles.main}>
            <form>
              <div>
                <div className="container-app">
                  <div className="header-app">
                    <div className="header-submit-wrapper">
                      <SubmitFormGroup
                        isLoading={isLoading}
                        valueInput={valueInput}
                        handleChangeInput={handleChangeInput}
                      />
                      <button
                        className="btn-submit"
                        disabled={isLoading}
                        onClick={handleSubmitForm}
                      >
                        {isLoading ? "Loading..." : "Add to the List"}
                      </button>
                    </div>
                    <SearchFormGroup
                      handleSearchElement={handleSearchElement}
                    />
                  </div>
                  <div>
                    <table>
                      <tbody>
                        <tr>
                          <th>Number</th>
                          <th>Country</th>
                          <th>Capital</th>
                          <th>Weather</th>
                          <th>Delete</th>
                          <th>Edit</th>
                        </tr>
                        {detailsDataList.map((element, index) => {
                          return (
                            <>
                              {savedIdEditElement === element.id ? (
                                <EditingTemplate
                                  isSaveLoading={isSaveLoading}
                                  element={element}
                                  index={index}
                                  inputSaveValue={inputSaveValue}
                                  handleSave={handleSave}
                                  handlerChangeSaveEditing={
                                    handlerChangeSaveEditing
                                  }
                                />
                              ) : (
                                <SingleTemplate
                                  index={index}
                                  element={element}
                                  handleDeleteElement={handleDeleteElement}
                                  handleEditClick={handleEditClick}
                                />
                              )}
                            </>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <ErrorMessages
                    error={error}
                    fetchError={fetchError}
                    errorNotFoundCapita={errorNotFoundCapita}
                    errorFoundTheSameCountry={errorFoundTheSameCountry}
                  />
                </div>

                <div className="container-search">
                  <SearchedValueView
                    detailsDataList={detailsDataList}
                    searchValueInput={searchValueInput}
                  />
                </div>
              </div>
            </form>
          </section>
        )}
      </main>
    </div>
  );
}
