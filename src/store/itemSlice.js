import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error("Failed to fetch item data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch item data");
  }
});

const itemSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    searchTerm: "",
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSearchTerm } = itemSlice.actions;
export const selectAllItems = (state) => state.items.items;
export const selectItemStatus = (state) => state.items.status;
export const selectItemError = (state) => state.items.error;
export const selectSearchTerm = (state) => state.items.searchTerm;

export default itemSlice.reducer;
