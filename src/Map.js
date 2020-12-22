import React, { useState } from "react";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import "./Map.css";
import numeral from "numeral";

function Map({ countries, casesType, center, zoom }) {
  const recovered = casesType === "recovered" && true;
  const cases = casesType === "cases" && true;
  const deaths = casesType === "deaths" && true;

  return (
    <div className="map">
      <MapContainer
        // center={center}
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contibutors'
        ></TileLayer>
        {console.log("map center - ", center)}
        {casesType === "recovered" &&
          countries.map((country) => (
            <Circle
              center={[country.countryInfo.lat, country.countryInfo.long]}
              fillOpacity={0.4}
              color={"green"}
              fillColor={"green"}
              radius={Math.sqrt(country[casesType]) * 400}
            >
              <Popup>
                <div className="popup__container">
                  <div
                    className="popup__flag"
                    style={{
                      backgroundImage: `url(${country.countryInfo.flag})`,
                    }}
                  ></div>
                  <div className="popup__country">{country.country}</div>
                  <div className="popup__cases">
                    Cases: {numeral(country.cases).format("0,0")}
                  </div>
                  <div className="popup__recovered">
                    Recovered: {numeral(country.recovered).format("0,0")}
                  </div>
                  <div className="popup__deaths">
                    Deaths: {numeral(country.deaths).format("0,0")}
                  </div>
                </div>
              </Popup>
            </Circle>
          ))}
        {casesType === "cases" &&
          countries.map((country) => (
            <Circle
              center={[country.countryInfo.lat, country.countryInfo.long]}
              fillOpacity={0.4}
              color={"red"}
              fillColor={"red"}
              radius={Math.sqrt(country[casesType]) * 300}
            >
              <Popup>
                <div className="popup__container">
                  <div
                    className="popup__flag"
                    style={{
                      backgroundImage: `url(${country.countryInfo.flag})`,
                    }}
                  ></div>
                  <div className="popup__country">{country.country}</div>
                  <div className="popup__cases">
                    Cases: {numeral(country.cases).format("0,0")}
                  </div>
                  <div className="popup__recovered">
                    Recovered: {numeral(country.recovered).format("0,0")}
                  </div>
                  <div className="popup__deaths">
                    Deaths: {numeral(country.deaths).format("0,0")}
                  </div>
                </div>
              </Popup>
            </Circle>
          ))}
        {casesType === "deaths" &&
          countries.map((country) => (
            <Circle
              center={[country.countryInfo.lat, country.countryInfo.long]}
              fillOpacity={0.4}
              color={"#B82925"}
              fillColor={"#B82925"}
              radius={Math.sqrt(country[casesType]) * 1500}
            >
              <Popup>
                <div className="popup__container">
                  <div
                    className="popup__flag"
                    style={{
                      backgroundImage: `url(${country.countryInfo.flag})`,
                    }}
                  ></div>
                  <div className="popup__country">{country.country}</div>
                  <div className="popup__cases">
                    Cases: {numeral(country.cases).format("0,0")}
                  </div>
                  <div className="popup__recovered">
                    Recovered: {numeral(country.recovered).format("0,0")}
                  </div>
                  <div className="popup__deaths">
                    Deaths: {numeral(country.deaths).format("0,0")}
                  </div>
                </div>
              </Popup>
            </Circle>
          ))}
      </MapContainer>
    </div>
  );
}

export default Map;
