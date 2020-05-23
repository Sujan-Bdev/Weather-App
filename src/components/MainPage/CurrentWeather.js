import React from "react";
import { Grid } from "@material-ui/core";
import Loading from './Loading';

const CurrentWeather = ({
  temperature,
  city,
  iconId,
  description,
  loading,
}) => {

  
  return (
    <Grid
      item
      xl={6}
      justify="center"
      alignContent="center"
      className="main-content"
      
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
