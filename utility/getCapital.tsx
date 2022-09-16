

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


export default getCapital