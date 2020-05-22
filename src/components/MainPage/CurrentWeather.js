import React from "react";
import { Grid } from "@material-ui/core";

export default function CurrentWeather(props) {
  const { temperature, city, iconId, description } = props;

  return (
    <Grid
      justify="center"
      alignContent="center"
      className="main-content"
      container
    >
      <div className="big-data">
        <i className={`wi wi-owm-${iconId} main-icon`} />
        <h2>{Math.round(temperature)}&deg;</h2>
      </div>
      <div className="info">
        <h2 className="main-description">{description}</h2>
        <h1 className="main-city">{city}</h1>
      </div>
    </Grid>
  );
}
