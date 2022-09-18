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

export const getCapital = () => {
  fetch("https://countriesnow.space/api/v0.1/countries/capital")
    .then((res) => {
      if (!res.ok) {
        throw Error("Could not fetch data");
      }
      return res.json();
    })
    .then((data: DataCountry) => {
      console.log("data from getCapital", data);
      setDataCountriesApi(data);
    })
    .catch((err) => {
      console.log(err.message);
      setFetchError(true);
    });
};
