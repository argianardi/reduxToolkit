import React from "react";
import AddProducts from "./components/AddProducts";
import ShowProduct from "./components/ShowProduct";

function App() {
  return (
    <div className="container">
      <div className="columns">
        <div className="column">
          <AddProducts />
        </div>
        <div className="column">
          <ShowProduct />
        </div>
      </div>
    </div>
  );
}

export default App;
