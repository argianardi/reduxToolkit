import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

// Base URL API
const apiUrl = " http://localhost:2023/products";

// Buat thunk async untuk get request
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const response = await axios.get(apiUrl);
    return response.data;
  }
);

// Buat thunk async untuk post request
export const addNewProduct = createAsyncThunk(
  "products/addNewProduct",
  async ({ title, price }) => {
    const response = await axios.post(apiUrl, {
      title,
      price,
    });
    return response.data;
  }
);

// Buat adapter untuk menyimpan data dalam array entities
const productsAdapter = createEntityAdapter({
  selectId: (product) => product.id,
});

// Buat initial state untuk mengisi nilai awal state
const initialState = productsAdapter.getInitialState({
  status: "idle",
  error: null,
});

// Buat slice untuk mengelola state
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // reducer untuk get request
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        productsAdapter.setAll(state, action.payload);
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // reducer untuk post request
    builder
      .addCase(addNewProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        productsAdapter.addOne(state, action.payload);
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export reducer dan adapter
export default productSlice.reducer;
export const productSelectors = productsAdapter.getSelectors(
  (state) => state.products
);
