import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchItems } from "./store/itemSlice";
import ItemList from "./components/ItemList";
import SearchBar from "./components/SearchBar";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  return (
    <div className="App">
      <div className="header-item-list">
        <h1>Item List</h1>
        <SearchBar />
      </div>
      <ItemList />
    </div>
  );
}

export default App;
