import React from "react";
import { Table, TableRow, TableBody, TableCell } from '@material-ui/core';
import moment from "moment";


const DetailWeather = ({ highTemp, lowTemp, sunRise, sunSet, humidity, windSpeed,time }) => {
  return (
    <div className="whole-details-area">
      <h4>Weather Details</h4>
      <Table className="weather-details">
        <TableBody>
          <TableRow>
            <TableCell>High Temperature</TableCell>
            <TableCell align="right">{highTemp}&deg;</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Low Temperature</TableCell>
            <TableCell align="right">{lowTemp}&deg;</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Humidity</TableCell>
            <TableCell align="right">{humidity}%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Wind Speed</TableCell>
            <TableCell align= "right">{windSpeed}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Sunrise</TableCell>
            <TableCell align= "right">
              {moment.unix(sunRise).format("h:mA")}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Sunset</TableCell>
            <TableCell align= "right">
              {moment.unix(sunSet).format("h:mA")}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align= "right">
              {moment.unix(time).format("ddd, h:mA")}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default DetailWeather;
