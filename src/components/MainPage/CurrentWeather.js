import React from "react";
import { Grid } from "@material-ui/core";

const CurrentWeather = ({
  temperature,
  city,
  iconId,
  description,
  loading,
}) => {

  if (loading) {
    return (
      <h2 class = 'loading'>Loading...</h2>
    )
  }
  
  return (
    <Grid
      item
      xl={6}
      justify="center"
      alignContent="center"
      className="main-content"
      container
    >
    
      <div className="big-data">
        <i className={`wi wi-owm-${iconId} main-icon`} />
        <h2>{temperature}&deg;</h2>
      </div>
      <div className="info">
        <h2 className="main-description">{description}</h2>
        <h1 className="main-city">{city}</h1>
      </div>
    </Grid>
  );
};

export default CurrentWeather;
