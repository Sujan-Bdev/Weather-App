import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const Navbar = ({ handleChangeCity, handleApiCall, currentCity }) => {
  return (
    <div className="appbar">
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          style={{ color: "#f57b51", textTransform: "uppercase" }}
        >
          Weather
        </Typography>
        <div className="search">
          <input
            type="text"
            placeholder="Search Location"
            className="search-input"
            value={currentCity}
            onChange={handleChangeCity}
          />
          <button
            type="submit"
            className="search-button"
            onClick={handleApiCall}
          >
            <i className="fas fa-search" />
          </button>
        </div>
      </Toolbar>
    </div>
  );
};

export default Navbar;
