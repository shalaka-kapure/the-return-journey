import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import SearchBar from "../SearchBar"; 
import { setSearchTerm } from "../../store/itemSlice";

const mockStore = configureStore([]);

describe("SearchBar Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      items: {
        searchTerm: "",
      },
    });
  });

  test("renders search input and button correctly", () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  test("dispatches setSearchTerm action on input change", () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const input = screen.getByPlaceholderText("Search...");

    fireEvent.change(input, { target: { value: "test" } });

    const actions = store.getActions();
    expect(actions).toEqual([{ type: setSearchTerm.type, payload: "test" }]);
  });

  test("dispatches setSearchTerm action on input change", () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
  
    const input = screen.getByPlaceholderText("Search...");
  
    fireEvent.change(input, { target: { value: "test" } });
  
    const actions = store.getActions();
    console.log("Dispatched actions:", actions); 
    expect(actions).toEqual([{ type: setSearchTerm.type, payload: "test" }]);
  });
  

  test("updates input value correctly", () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const input = screen.getByPlaceholderText("Search...");

    fireEvent.change(input, { target: { value: "example" } });

    expect(input.value).toBe("example");
  });

  test("clears input value when set to empty", () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const input = screen.getByPlaceholderText("Search...");

    fireEvent.change(input, { target: { value: "" } });

    expect(input.value).toBe("");
  });
});
