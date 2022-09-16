const getWeather = (foundCapitalElement, dataCallback) => {
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
            setIsLoading(false)
        });
};



export default getWeather