import React from "react";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../store/itemSlice";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value)); 
  };

  return (
    <div className="search-bar">
      <InputBase
        placeholder="Search..."
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleSearch} 
      />
      <IconButton type="button" aria-label="search">
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default SearchBar;
