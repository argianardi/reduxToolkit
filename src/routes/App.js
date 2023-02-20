import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddProducts from "../components/AddProducts";
import EditProducts from "../components/EditProduct";
import ShowProduct from "../components/ShowProduct";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<ShowProduct />} />
          <Route path="add" element={<AddProducts />} />
          <Route path="edit/:id" element={<EditProducts />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
