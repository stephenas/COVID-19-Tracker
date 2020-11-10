import React, { useState, useEffect } from "react";
import CovidImage from "./images/image.png";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "./App.css";
import InfoBox from "./InfoBox";
import Table from "./Table";
import LineGraph from "./LineGraph";
import Map from "./Map";
import "leaflet/dist/leaflet.css";
import numeral from "numeral";

function App() {
  const [countries, setCountries] = useState([]);
  const [selectCountry, setSelectCountry] = useState("Worldwild");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  let [mapCenter, setMapCenter] = useState({
    lat: 24,
    lng: 54,
  });
  const [mapZoom, setMapZoom] = useState(2);
  const [casesType, setCasesType] = useState("cases");
  const printCounts = (counts) => {
    if (counts) {
      return `+${numeral(counts).format("0.0a")}`;
    } else {
      return "+0";
    }
  };
  const [lineGraphCountry, setLineGraphCountry] = useState("Worldwild");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => setCountryInfo(data));
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countryList = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countryList);
          setMapCountries(data);
          setTableData(data.sort((a, b) => (a.cases > b.cases ? -1 : 1))); //It's shows cases of the country in decending order
        });
    };
    getCountriesData();
  }, []);

  const selectedCountry = async (event) => {
    const currentCountry = event.target.value;

    // loads the page according to the selected counry
    if (currentCountry === "Worldwild") {
      const url = "https://disease.sh/v3/covid-19/all";
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setSelectCountry(currentCountry);
          setCountryInfo(data);
          setMapCenter([24, 54]);
          setMapZoom(6);
          setLineGraphCountry("Worldwild");
        });
    } else {
      const url = `https://disease.sh/v3/covid-19/countries/${currentCountry}`;
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setSelectCountry(currentCountry);
          setCountryInfo(data);
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(4);
          setLineGraphCountry(data.country);
        });
    }
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <img src={CovidImage} alt="" className="app__covidImage" />
          {/* <h1 className="app__header__title">Covid-19 Tracker</h1> */}
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={selectedCountry}
              value={selectCountry}
            >
              <MenuItem value="Worldwild">Worldwild</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name} </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__states">
          <InfoBox
            isRed1
            active={casesType === "cases"}
            onClick={(e) => setCasesType("cases")}
            title="Coronovirus cases"
            cases={printCounts(countryInfo.todayCases)}
            total={printCounts(countryInfo.cases)}
          ></InfoBox>
          <InfoBox
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            cases={printCounts(countryInfo.todayRecovered)}
            total={printCounts(countryInfo.recovered)}
          ></InfoBox>
          <InfoBox
            isRed
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            cases={printCounts(countryInfo.todayDeaths)}
            total={printCounts(countryInfo.deaths)}
          ></InfoBox>
        </div>
        <Map
          className="app__left__map"
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        ></Map>
      </div>
      <div className="app__right">
        <Card className="app__right__card">
          <CardContent>
            {/* Table */}
            <h3>Live Cases by country</h3>
            <Table countries={tableData} />
            {/* Graph */}
            <h3 className="graphTitle">
              Total {casesType} in {lineGraphCountry}
            </h3>
            <LineGraph
              className="app__graph"
              country={lineGraphCountry}
              casesType={casesType}
            ></LineGraph>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
