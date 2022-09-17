import React, { useState, useEffect, ChangeEvent } from "react";
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

export default function Home() {
  const [valueInput, setValueInput] = useState("");
  const [dataCountriesApi, setDataCountriesApi] = useState([]);
  const [error, setError] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [errorNotFoundCapita, setErrorNotFoundCapital] = useState(false);
  const [errorFoundTheSameCountry, setErrorFoundTheSameCountry] =
    useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  // Array of country , capital , weather Info
  const [detailsDataList, setDetailsDataList] = useState([]);
  // Edit functionality
  const [inputSaveValue, setInputSaveValue] = useState("");
  const [savedIdEditElement, setSavedIDEditElement] = useState(false);
  // Search
  const [searchValueInput, setSearchValueInput] = useState("");

  //---------------------------------------------------------------------------//
  const handleChangeInput = (e: ChangeEvent<HTMLElement>): void => {
    setValueInput(e.target.value);
  };

  const handleSave = (e: any) => {
    setInputSaveValue(e.target.value);
  };

  const getCapital = () => {
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
  const getWeather = (foundCapitalElement: string, dataCallback) => {
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
        console.log("error", err);
        setFetchError(true);
      })
      .finally(() => {
        setIsSaveLoading(false);
        setIsLoading(false);
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

    console.log("find capital", foundCountry?.capital);

    return foundCountry?.capital;
  };

  const handleSubmitForm = (e: any) => {
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
  const handleDeleteElement = (e: any, id) => {
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

  const handleEditClick = (e, element, id) => {
    e.preventDefault();
    console.log("Edit id", id);
    console.log("Edit element", element);

    // default Value when we editing
    setInputSaveValue(element.country);
    setSavedIDEditElement(id);
  };

  const handlerChangeSaveEditing = (e) => {
    e.preventDefault();

    setIsSaveLoading(true);

    let findElement = detailsDataList.find((elem) => {
      return elem.id === savedIdEditElement;
    });

    console.log("findElement w Edit", findElement);

    findElement.country = inputSaveValue;

    // if we use react.Memo
    // const editedElement = {
    //     ...findElement,
    //     country: inputSaveValue
    // }

    console.log("findElement w Edit", findElement);

    const foundCapitalElement = findCapital(inputSaveValue);

    // Second API to get Weather info
    // Second API to get Weather info
    if (foundCapitalElement) {
      getWeather(foundCapitalElement, (weatherDetails) => {
        findElement.weather = weatherDetails;
        findElement.capital = foundCapitalElement;

        setSavedIDEditElement(null);
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
        <section className={styles.main}>
          <form>
            <div className="container">
              <div>
                <SubmitFormGroup
                  isLoading={isLoading}
                  valueInput={valueInput}
                  handleChangeInput={handleChangeInput}
                />
                <button disabled={isLoading} onClick={handleSubmitForm}>
                  {isLoading ? "Loading..." : "Add to the List"}
                </button>
                <div>
                  <table>
                    <tbody>
                      {detailsDataList.map((element, index) => {
                        return (
                          <div key={index}>
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
                          </div>
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
              <></>
              <div className="container-search">
                <SearchFormGroup setSearchValueInput={setSearchValueInput} />
                {/* displaying search value */}
                <SearchedValueView
                  detailsDataList={detailsDataList}
                  searchValueInput={searchValueInput}
                />
              </div>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
