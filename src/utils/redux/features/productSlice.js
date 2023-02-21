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

// Buat thunk async untuk delete request
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    await axios.delete(`${apiUrl}/${id}`);
    return id;
  }
);

// Buat thunk async untuk put request
export const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ id, title, price }) => {
    const response = await axios.put(`${apiUrl}/${id}`, {
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
  // inisital state get Products
  getProductsStatus: "idle",
  getProductsError: null,

  // inisital state post Products
  addProductStatus: "idle",
  addProductError: null,

  // inisital state delete Products
  deleteProductStatus: "idle",
  deleteProductError: null,

  // initial state put product
  editProductStatus: "idle",
  editProductError: null,
});

// Buat slice untuk mengelola state
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // reducer untuk get products
    builder
      .addCase(getProducts.pending, (state) => {
        state.getProductsStatus = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.getProductsStatus = "succeeded";
        productsAdapter.setAll(state, action.payload);
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.getProductsStatus = "failed";
        state.getProductsError = action.error.message;
      });

    // reducer untuk add product
    builder
      .addCase(addNewProduct.pending, (state) => {
        state.addProductStatus = "loading";
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.addProductStatus = "succeeded";
        productsAdapter.addOne(state, action.payload);
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.addProductStatus = "failed";
        state.addProductError = action.error.message;
      });

    // reducer untuk delete request
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.deleteProductStatus = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.deleteProductStatus = "succeeded";
        productsAdapter.removeOne(state, action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.deleteProductStatus = "failed";
        state.deleteProductError = action.error.message;
      });

    // reducer untuk put request
    builder
      .addCase(editProduct.pending, (state, action) => {
        state.editProductStatus = "loading";
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.editProductStatus = "succeeded";
        productsAdapter.updateOne(state, {
          id: action.payload.id,
          updates: action.payload,
        });
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.editProductStatus = "failed";
        state.editProductError = action.error.message;
      });
  },
});

// Export reducer dan adapter
export default productSlice.reducer;
export const productSelectors = productsAdapter.getSelectors(
  (state) => state.products
);
