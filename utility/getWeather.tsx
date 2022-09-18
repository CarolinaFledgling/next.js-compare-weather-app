interface WeatherItem {
    main: string;
  }
  
  interface DataWeather {
    weather: WeatherItem[];
  }

export const getWeather = (
    foundCapitalElement: string,
    dataCallback: (weatherDetails: string[]) => void,

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